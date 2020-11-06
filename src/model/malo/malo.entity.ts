import { type } from 'os';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EvaluateDetail } from '../evaluate-detail/evaluate-detail.entity';
import { Malfunction } from '../malfunction/malfunction.entity';
import { Model } from '../model/model.entity';

@Entity()
export class Malfunction_options {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { comment: '模型Id', nullable: true, default: null })
  modelId: number;

  @Column('int', { comment: '故障Id', nullable: true, default: null })
  malfunctionId: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  optionName: string;

  @Column({ type: 'int', nullable: true, default: 1 })
  processType: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  ratio: number;
}
