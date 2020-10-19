import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BrandClassifyRelation } from '../brand-classify-relation/brand-classify-relation.entity';
@Entity()
export class Classify {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { nullable: false, comment: '类型名称' })
  classifyName: string;

  @Column('varchar', {
    nullable: true,
    comment: '图标',
    default:
      'https://tse4-mm.cn.bing.net/th/id/OIP.kNVeGWuDQ7wNp5BORJkhwQAAAA?w=173&h=180&c=7&o=5&pid=1.7',
  })
  icon: string;

  @Column('varchar', { nullable: true, comment: '大图标' })
  bigIcon: string;

  @Column('varchar', { nullable: true, comment: '描述' })
  description: string;

  @Column('int', { nullable: false, default: 1, comment: '状态' })
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
    type => BrandClassifyRelation,
    bcr => bcr.classifyId,
  )
  BrandClassifyRelation: BrandClassifyRelation[];

  @Column({ type: 'enum', enum: [0, 1], default: 0, comment: '是否删除' })
  isDelete: number;

}
