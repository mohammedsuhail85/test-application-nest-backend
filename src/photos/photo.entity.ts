import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: String;

  @ManyToOne(type => User, user => user.photos)
  user: User
}