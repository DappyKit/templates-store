import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  displayName: string;

  @Column()
  photoUrl: string;
}
