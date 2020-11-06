import { EvaluateDetail } from './../evaluate-detail/evaluate-detail.entity';
import { Malfunction_options } from './../malo/malo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Malfunction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { comment: '模型Id', nullable: true, default: null })
  modelId: number;

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

  @Column({ type: 'decimal', nullable: true, default: 5 })
  maintainTopPrice: number;
}
