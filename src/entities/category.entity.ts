import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";
import * as Validator from 'class-validator';

// @Index("uq_category_name", ["name"], { unique: true })
// @Index("uq_category_image_path", ["imagePath"], { unique: true })
@Entity()
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

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
}
