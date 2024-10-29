import { IsString, IsNotEmpty, IsArray, ValidateNested, IsInt } from 'class-validator';

export class QuestionDto {
  @IsInt()
  @IsNotEmpty()
  correctAnswerIndex: number;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  answers: string[];
}
