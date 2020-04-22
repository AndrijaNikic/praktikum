import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Article } from 'entities/article.entity';
import { Category } from 'entities/category.entity';
import { CartArticle } from 'entities/cart-article.entity';
import { Cart } from 'entities/cart.entity';
import { Order } from 'entities/order.entity';
import { Photo } from 'entities/photo.entity';
import { ApiAdministratorController } from './controllers/api.administrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.servise';
import { ArticleController } from './controllers/api.article.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ Administrator,
                  Article,
                  Category,
                  CartArticle,
                  Cart,
                  Order,
                  Photo 
                ]
    }),
    TypeOrmModule.forFeature([ Administrator, Category, Article ])
  ],
  controllers: [AppController, 
                ApiAdministratorController,
                CategoryController,
                ArticleController],
  providers: [AdministratorService,
              CategoryService,
              ArticleService],
})
export class AppModule {}
