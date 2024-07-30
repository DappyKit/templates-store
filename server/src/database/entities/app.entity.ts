import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class App {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column()
  creationDate: string;

  @Column()
  updateDate: string;

  @Column()
  authorId: number;

  @Column()
  gitHub: string;

  @Column()
  appFormConfig: string;

  @Column()
  isPublic: boolean;
}
