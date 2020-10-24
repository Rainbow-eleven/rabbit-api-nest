import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'decimal', nullable: true, default: 500 })
  subscription: number;

  @Column({ type: 'decimal', nullable: true, default: 999 })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  remark: string;
}
