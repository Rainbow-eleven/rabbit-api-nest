import { EvaluateDetail } from './../evaluate-detail/evaluate-detail.entity';
import { type } from 'os';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from '../model/model.entity';

@Entity()
export class Evaluate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Model,
    model => model.evaluate,
  )
  modelId: Model;

  @OneToOne(
    type => EvaluateDetail,
    e => e.evaluateId,
  )
  EvaluateDetail: EvaluateDetail;

  @Column({ type: 'decimal', nullable: true, default: 500 })
  subscription: number;

  @Column({ type: 'decimal', nullable: true, default: 999 })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  remark: string;
}
