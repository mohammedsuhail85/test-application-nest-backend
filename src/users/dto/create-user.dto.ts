import { Photo } from "src/photos/photo.entity";


export interface CreateUserDto {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  photo: number,
  carNo: number
}