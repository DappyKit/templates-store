import { Inject, Injectable } from '@nestjs/common';
import { Question } from 'src/database/entities/question.entity';
import { Application } from 'src/database/entities/application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from '../../applications/dto/create-application.dto';
import { QuestionDto } from '../../applications/dto/question.dto';
import { ForbiddenException } from 'src/exceptions/forbiddenExceptions';
import { EXCEPTION_MESSAGES } from 'src/consts/exceptionMessages';
import { UserService } from 'src/users/user.service';


@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private readonly appRepository: Repository<Application>,
    private userService: UserService,

  ) {}

  async createApplication(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const {userId} = createApplicationDto;
    const user = await this.userService.findUser(userId);
    if(!user) {
        throw new ForbiddenException(EXCEPTION_MESSAGES.FORBIDDEN_CREATION_APPS);
    }
    // 1. Create the Quiz entity from the DTO
    const newQuiz = new Application();
    newQuiz.title = createApplicationDto.title;
    newQuiz.description = createApplicationDto.description;
    
    // 2. Map QuestionDto[] to Question[]
    const questions = createApplicationDto.questions.map((questionDto: QuestionDto) => {
      const question = new Question();
      question.question = questionDto.question;
      question.answers = questionDto.answers;
      question.correctAnswerIndex = questionDto.correctAnswerIndex;
      return question;
    });
    
    newQuiz.questions = questions;
    newQuiz.user = user;

    // 3. Save the quiz and its associated questions (with cascade: true, questions will be saved)
    const savedQuiz = await this.appRepository.save(newQuiz);
    
    return savedQuiz;
  }


  public async findApplicationsByUserId(userId: number): Promise<Application[]> {
    return this.appRepository.find({
      where: { userId },
    });
  }
  
}
