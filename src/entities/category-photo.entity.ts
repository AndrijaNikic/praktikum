import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import * as Validator from 'class-validator';
import { Category } from "./category.entity";

// @Index("uq_photo_image_path", ["imagePath"], { unique: true })
// @Index("fk_photo_article_id", ["articleId"], {})
@Entity("category_photo")
export class CategoryPhoto {
  @PrimaryGeneratedColumn({ type: "int", name: "category_photo_id", unsigned: true })
  photoId: number;

  @Column({type: "int", name: "category_id", unsigned: true})
  categoryId: number;

  @Column({
    type: "varchar",
    name: "image_path",
    unique: true,
    length: 128
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 128)
  imagePath: string;

  @OneToOne(() => Category, (category) => category.categoryPhotos, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;
}