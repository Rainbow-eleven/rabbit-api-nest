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

  @ManyToOne(
    type => Evaluate,
    e => e.EvaluateDetail,
  )
  evaluateId: Evaluate;

  @ManyToOne(
    type => Malfunction,
    e => e.EvaluateDetail,
  )
  malfId: Malfunction;

  @ManyToOne(
    type => Malfunction_options,
    e => e.EvaluateDetail,
  )
  optionId: Malfunction_options;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  optionName: string;
}
