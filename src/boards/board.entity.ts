import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Board extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  status: BoardStatus;

  @ApiProperty()
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
