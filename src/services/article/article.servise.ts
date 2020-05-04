import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";
import { AddArticleDto } from "dtos/article/add.article.dto";
import { ApiResponse } from "misc/api.response.class";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
    constructor(
        @InjectRepository(Article) private readonly article: Repository<Article>){
        super(article);
    }

    async createFullArticle(data: AddArticleDto): Promise<Article | ApiResponse> {
        let newArticle: Article = new Article();
        newArticle.name = data.name;
        newArticle.categoryId = data.categoryId;
        newArticle.description = data.description;
        newArticle.imagePath = data.imagePath;
        newArticle.ingredients = data.ingredients;
        newArticle.price = data.price;

        let savedArticle = await this.article.save(newArticle);

        return await this.article.findOne(savedArticle.articleId, {
            relations: [
                "category"
            ]
        });
    }
}
