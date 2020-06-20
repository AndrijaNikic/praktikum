import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { Article } from "./article.entity";
import * as Validator from 'class-validator';
import { CategoryPhoto } from "./category-photo.entity";

// @Index("uq_category_name", ["name"], { unique: true })
// @Index("uq_category_image_path", ["imagePath"], { unique: true })
@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({
    type: "varchar",
    unique: true,
    length: 32
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,32)
  name: string;

  @Column({
    type: "varchar",
    name: "image_path",
    unique: true,
    length: 128
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,128)
  imagePath: string;

  @Column({
    type: "varchar",
    length: 128
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10, 1000)
  description: string

  @Column({
    type: "enum",
    enum: ["unit", "gram"],
    default: () => "'unit'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn(["unit", "gram"])
  measurement: "unit" | "gram";


  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @OneToOne(() => CategoryPhoto, (categoryPhoto) => categoryPhoto.category)
  categoryPhotos: CategoryPhoto[];
}





