import { type } from 'os';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Evaluate } from '../evaluate/evaluate.entity';
import { Malfunction } from '../malfunction/malfunction.entity';
import { Malfunction_options } from '../malo/malo.entity';
import { Model } from '../model/model.entity';

@Entity()
export class EvaluateDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { comment: '评估Id', nullable: true, default: null })
  evaluateId: number;

  @Column('int', { comment: '故障Id', nullable: true, default: null })
  malfId: number;

  @Column('int', { comment: '故障选项Id', nullable: true, default: null })
  optionId: number;
}
