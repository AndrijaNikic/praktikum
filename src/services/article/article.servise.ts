import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Category } from "src/entities/category.entity";
import { Repository, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";
import { AddArticleDto } from "dtos/article/add.article.dto";
import { ApiResponse } from "misc/api.response.class";
import { EditArticleDto } from "dtos/article/edit.article.dto";
import { ArticleFilterDto } from "dtos/article/article.filter.dto";

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
                "category",
                "photos"
            ]
        });
    }

    async editById(id:number, data: EditArticleDto) {
        const existingArticle: Article = await this.article.findOne(id);
        if(!existingArticle) {
            return new ApiResponse('error', -5001, 'Article not found.');
        }

        existingArticle.name = data.name;
        existingArticle.categoryId = data.categoryId;
        existingArticle.description = data.description;
        existingArticle.imagePath = data.imagePath;
        existingArticle.ingredients = data.ingredients;
        existingArticle.price = data.price;

        const savedArticle: Article = await this.article.save(existingArticle);
        if(!savedArticle) {
            return new ApiResponse('error', -5002, 'Could not save new article.');
        }

        return await this.article.findOne(id, {
            relations: ['category', 'photos']
        });
    }

    async filter(data: ArticleFilterDto): Promise<Article[] | ApiResponse> {
        const builder = await this.article.createQueryBuilder("article");

        // builder.innerJoinAndSelect("article.price", "ap");

        builder.leftJoinAndSelect("article.photos", "photos");

        builder.where('article.categoryId = :catId', { catId: data.categoryId });

        let orderBy = 'article.price';
        let orderDirection: 'ASC' | 'DESC' = 'ASC';

        if (data.orderBy) {
            orderBy = data.orderBy;
        }

        // if (orderBy === 'price'){
        //     orderBy = 'ap.price';
        // }

        if (data.orderDirection) {
            orderDirection = data.orderDirection;
        }

        builder.orderBy(orderBy, orderDirection); 

        let page = 0;
        let perPage: 5 | 10 | 25 | 50 | 75 = 25;

        if (data.page && typeof data.page === 'number') {
            page = data.page;
        }

        if (data.itemsPerPage && typeof data.itemsPerPage === 'number') {
            perPage = data.itemsPerPage;
        }

        builder.skip(page * perPage);
        builder.take(perPage);

        let articles = await builder.getMany();

        if(articles.length === 0) {
            return new ApiResponse("ok", 0, "There are no articles found.");
        }

        return articles;

    }
}
