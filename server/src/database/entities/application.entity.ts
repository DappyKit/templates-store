import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.applications)
    user: User;

    @OneToMany(() => Question, (question) => question.application, { cascade: true })
    questions: Question[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: false })
    isPublic: boolean;

    @Column({ nullable: true })
    userId: number; // Define the userId column
}

