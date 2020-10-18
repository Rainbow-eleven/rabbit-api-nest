import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class Classify {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number

  @Column("varchar", { nullable: false, comment: "类型名称" })
  classifyName: string;

  @Column("varchar", { nullable: true, comment: "图标" })
  icon: string

  @Column("varchar", { nullable: true, comment: "大图标" })
  bigIcon: string

  @Column("varchar", { nullable: true, comment: "描述" })
  description: string

  @Column("int", { nullable: false, default: 1, comment: "状态" })
  status: number

  @Column("bigint", { comment: "创建人", nullable: true })
  createdUserId: number

  @Column("bigint", { comment: "修改人", nullable: true })
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