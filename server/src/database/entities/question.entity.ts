import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './application.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column('simple-array')
  answers: string[];

  @Column()
  correctAnswerIndex: number;

  @ManyToOne(() => Application, (app) => app.questions)
  application: Application;
}
