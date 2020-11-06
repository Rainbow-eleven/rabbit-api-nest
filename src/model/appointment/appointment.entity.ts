import { Users } from './../user/user.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  @Generated('uuid')
  appointCode: number;

  @Column('int', { comment: '用户Id', nullable: true, default: null })
  userId: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  appintDate: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 1,
  })
  temporalInterval: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  adress: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 1,
  })
  status: number;
}
