import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Application } from './application.entity';

@Entity('users')
export class User {

  @PrimaryColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  displayName: string;

  @Column()
  photoUrl: string;

  @OneToMany(() => Application, (quiz) => quiz.user)
  applications: Application[];

}
