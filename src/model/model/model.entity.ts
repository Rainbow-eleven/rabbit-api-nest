import { EvaluateDetail } from './../evaluate-detail/evaluate-detail.entity';
import { Evaluate } from './../evaluate/evaluate.entity';
import { Malfunction } from './../malfunction/malfunction.entity';
import { Classify } from './../classify/classify.entity';
import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Malfunction_options } from '../malo/malo.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: true })
  modelName: string;

  @ManyToOne(
    type => Brand,
    brand => brand.model,
  )
  @JoinColumn()
  brandId: Brand;

  @ManyToOne(
    type => Classify,
    e => e.model,
  )
  @JoinColumn()
  classifyId: Classify;

  @Column({ type: 'decimal', nullable: true })
  exchangePrice: number;

  @Column({ type: 'decimal', nullable: true })
  topPrice: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'https://czh1010.oss-cn-beijing.aliyuncs.com/OIP.jpg',
  })
  faceImg: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  contentImg: [];

  @Column({
    type: 'varchar',
    nullable: false,
    default: '此商品暂时没有任何描述。',
  })
  description: string;

  @Column({ type: 'int', default: 0, nullable: true })
  status: number;

  @Column('bigint', { comment: '创建人', nullable: true, default: null })
  createdUserId: number;

  @Column('bigint', { comment: '修改人', nullable: true, default: null })
  updatedUserId: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '修改时间',
  })
  updatedTime: Date;

  @OneToMany(
    type => Malfunction,
    e => e.modelId,
  )
  malfunction: Model;

  @OneToMany(
    type => Malfunction_options,
    e => e.modelId,
  )
  malfunction_option: Model;

  @OneToMany(
    type => Evaluate,
    e => e.modelId,
  )
  evaluate: Model;
}
