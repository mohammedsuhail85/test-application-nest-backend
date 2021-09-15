import { Photo } from "src/photos/photo.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean

  @OneToMany(type => Photo, photo => photo.user)
  @JoinColumn()
  photos: Photo[];
}