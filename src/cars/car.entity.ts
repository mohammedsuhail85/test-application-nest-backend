import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cars extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  brand: string;

  @Column()
  model: string;

  @ManyToOne(() => User, user => user.cars)
  user: User
}