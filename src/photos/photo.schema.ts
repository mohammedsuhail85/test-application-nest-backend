import { EntitySchema } from "typeorm";
import { Photo } from "./photo.entity";


export const PhotoSchema = new EntitySchema<Photo>({
  name: 'Photo',
  target: Photo,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: {
      type: String
    },
    value: {
      type: String,
      nullable: false
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User'
    }
  }
})