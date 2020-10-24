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

  @ManyToOne(
    type => Model,
    model => model.malfunction_option,
  )
  @JoinColumn()
  modelId: Model;

  @ManyToOne(
    type => Malfunction,
    malf => malf.malfunction_option,
  )
  @JoinColumn()
  malfId: Malfunction;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  optionName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  optionContent: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  isHint: number;

  @Column({ type: 'varchar', nullable: true, default: '' })
  hintTitle: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  hintInfo: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  hintImg: string;

  @Column({ type: 'int', nullable: true, default: 1 })
  processType: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  ratio: number;

  @OneToMany(
    type => EvaluateDetail,
    e => e.optionId,
  )
  EvaluateDetail: EvaluateDetail;
}
