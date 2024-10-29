import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested, isInt, IsInt, IsBoolean } from 'class-validator';
import { QuestionDto } from './question.dto';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto) // Transforms plain objects to MemberDto instances
  questions: QuestionDto[];

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsBoolean()
  isPublic: boolean;
}


