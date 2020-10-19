import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Brand {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number

  @Column("varchar", { comment: "品牌名称" })
  brandName: string

  @Column("varchar", { comment: "品牌logo", default: "https://tse4-mm.cn.bing.net/th/id/OIP.xbMiTPgzbz32rV9jW8bEgwAAAA?w=180&h=180&c=7&o=5&pid=1.7" })
  logo: string

  @Column("varchar", { comment: "描述" })
  description: string

  @Column("int", { comment: "状态", default: 1 })
  status: number

  @Column("bigint", { comment: "创建人", nullable: true, default: null })
  createdUserId: number

  @Column("bigint", { comment: "修改人", nullable: true, default: null })
  updatedUserId: number

  @CreateDateColumn({
    type: "timestamp",
    comment: "创建时间"
  })
  createdTime: Date

  @UpdateDateColumn({
    type: "timestamp",
    comment: "修改时间"
  })
  updatedTime: Date

  @Column({ type: "enum", enum: [0, 1], default: 0, comment: "是否删除" })
  isDelete: number
}