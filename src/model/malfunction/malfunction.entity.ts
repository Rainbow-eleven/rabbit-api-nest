import { Model } from './../model/model.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Malfunction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Model,
    model => model.malfunction,
  )
  modelId: Model;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  isHint: number;

  @Column({ type: 'varchar', nullable: true, default: '' })
  hintTitle: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  hintInfo: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  hintImg: string;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  maintainTopPrice: number;
}
