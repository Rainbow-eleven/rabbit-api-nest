import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Classify } from '../classify/classify.entity';

@Entity()
export class BrandClassifyRelation {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @OneToOne(
    type => Brand,
    brand => brand.BrandClassifyRelation,
  )
  @JoinColumn()
  brandId: Brand;

  @ManyToOne(
    type => Classify,
    classify => classify.BrandClassifyRelation,
  )
  @JoinColumn()
  classifyId: Classify;

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

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 0,
    nullable: false,
    comment: '是否删除',
  })
  isDelete: number;
}
