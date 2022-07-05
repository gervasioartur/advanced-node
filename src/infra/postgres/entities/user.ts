
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ nullable: true })
  facebookId?: string
}
