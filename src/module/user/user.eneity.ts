import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string

  @Column("varchar")
  password: string

  @Column( { default: "1111" })
  time: string
}