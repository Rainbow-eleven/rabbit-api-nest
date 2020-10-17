import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number;

  @Column()
  account: string

  @Column("varchar")
  password: string

  @Column({ default: "羊驼" })
  userName: string

  @Column("int", { default: 0 })
  isAuthentication: number

  @Column("varchar", { default: "" })
  name: string

  @Column("varchar", { default: "" })
  cardNo: string

  @Column("varchar", { default: "https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/dcc451da81cb39db914ef9c4d8160924aa183091.jpg" })
  faceUrl: string

  @CreateDateColumn({
    type: "timestamp",
    comment: '创建时间',
  })
  time: Date;
}