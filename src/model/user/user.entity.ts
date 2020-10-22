import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({ nullable: true, comment: '用户名', type: 'varchar', unique: true })
  account: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column('varchar', { nullable: true })
  username: string;

  @Column('int', { default: 0, nullable: false })
  isAuthentication: number;

  @Column('varchar', { default: '', nullable: true })
  name: string;

  @Column('varchar', { default: '', nullable: true })
  cardNo: string;

  @Column('varchar', {
    nullable: false,
    default:
      'https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/dcc451da81cb39db914ef9c4d8160924aa183091.jpg',
  })
  faceUrl: string;

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
}
