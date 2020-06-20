import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Article } from 'src/entities/article.entity';
import { Category } from 'src/entities/category.entity';
import { CartArticle } from 'src/entities/cart-article.entity';
import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/order.entity';
import { Photo } from 'src/entities/photo.entity';
import { ApiAdministratorController } from './controllers/api/api.administrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.servise';
import { ArticleController } from './controllers/api/api.article.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PhotoService } from './services/photo/photo.service';
import { CartService } from './services/cart/cart.service';
import { ApiCartController } from './controllers/api/api.cart.controller';
import { OrderService } from './services/order/order.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigugarion } from 'config/mail.configuration';
import { OrderMailerService } from './services/order/order.mailer.service';
import { AdministratorOrderController } from './controllers/api/administrator.order.controller';
import { AdministratorToken } from './entities/administrator-token.entity';
import { CategoryPhoto } from './entities/category-photo.entity';
import { CategoryPhotoService } from './services/category-photo/category-photo.service';

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
                  Photo,
                  AdministratorToken,
                  CategoryPhoto
                ]
    }),
    TypeOrmModule.forFeature([ Administrator, Category, Article, Photo, Order, Cart, CartArticle, AdministratorToken, CategoryPhoto ]),
    MailerModule.forRoot({
      transport: `smtps://${MailConfigugarion.username}:${MailConfigugarion.password}@${MailConfigugarion.hostname}`,
      defaults: {
        from: MailConfigugarion.senderEmail
      }
    })
  ],
  controllers: [AppController, 
                ApiAdministratorController,
                CategoryController,
                ArticleController,
                AuthController,
                ApiCartController,
                AdministratorOrderController],
  providers: [AdministratorService,
              CategoryService,
              ArticleService,
              PhotoService,
              CartService,
              OrderService,
              OrderMailerService,
              CategoryPhotoService],
  exports: [
      AdministratorService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
            .exclude('auth/*')
            .forRoutes({path: 'api/*', method: RequestMethod.POST},
                       {path: 'api/*', method: RequestMethod.PATCH},
                       {path: 'api/*', method: RequestMethod.DELETE},
                       {path: 'api/*', method: RequestMethod.PUT});
  }
}
