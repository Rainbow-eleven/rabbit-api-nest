import { UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { Column } from 'typeorm';
export class globalEntity {
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
}