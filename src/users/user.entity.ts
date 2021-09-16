import { Cars } from "src/cars/car.entity";
import { Photo } from "src/photos/photo.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false })
  password: string;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

  @OneToMany(() => Cars, car => car.user)
  cars: Cars[];
}