import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  //   JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
