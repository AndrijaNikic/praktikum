import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { Category } from "./category.entity";
import { CartArticle } from "./cart-article.entity";
import { Photo } from "./photo.entity";
import * as Validator from 'class-validator';

// @Index("uq_article_image_path", ["imagePath"], { unique: true })
// @Index("fk_article_category_id", ["categoryId"], {})
@Entity("article")
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column({type:"varchar", length: 128})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2, 128)
  name: string;

  @Column({type: "int", name: "category_id", unsigned: true})

  categoryId: number;

  @Column({type: "text"})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(64, 1000)
  description: string;

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

  @Column({type:"varchar", length: 128})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(64, 1000)
  ingredients: string;

  @Column({type: "int"})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  price: number;

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(() => CartArticle, (cartArticle) => cartArticle.article)
  cartArticles: CartArticle[];

  @OneToMany(() => Photo, (photo) => photo.article)
  photos: Photo[];
}
