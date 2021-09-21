import { Cars } from "src/cars/car.entity";
import { Photo } from "src/photos/photo.entity";
import { AfterLoad, BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

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

  @Column({ nullable: false, unique: true })
  email: string;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

  @OneToMany(() => Cars, car => car.user)
  cars: Cars[];

  tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword(): Promise<void> {

    if (this.tempPassword !== this.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hashSync(this.password, salt);

      this.password = hash;
    }
  }
}