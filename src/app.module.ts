import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
    TypeOrmModule.forFeature([ Administrator, Category, Article, Photo, Order, Cart, CartArticle ]),
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
                ApiCartController],
  providers: [AdministratorService,
              CategoryService,
              ArticleService,
              PhotoService,
              CartService,
              OrderService,
              OrderMailerService],
  exports: [
      AdministratorService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
            .exclude('auth/*')
            .forRoutes('api/*');
  }
}
