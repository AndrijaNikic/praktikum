import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "src/entities/cart.entity";
import { CartArticle } from "src/entities/cart-article.entity";
import { ApiResponse } from "misc/api.response.class";
import { Article } from "src/entities/article.entity";
import { Order } from "src/entities/order.entity";

@Injectable()
export class CartService {
    constructor(@InjectRepository(Cart) private cart: Repository<Cart>,
                @InjectRepository(CartArticle) private cartArticle: Repository<CartArticle>,
                @InjectRepository(Article) private article: Repository<Article>,
                @InjectRepository(Order) private order: Repository<Order>) { }


    async getLastCartByOrderId(orderId: number): Promise<Cart | null> {
        const carts = await this.cart.find({
            where: {
                orderId: orderId
            },
            order: {
                createdAt: "DESC",
            },
            take: 1,
            relations: [ "order" ],
        });

        if(!carts || carts.length === 0) {
            return null;
        }

        const cart = carts[0];

        if(cart.order !== null){
            return null;
        }

        return cart;
    }
    
    async createNewCart(): Promise<Cart> {
        const newCart = new Cart();
        return await this.cart.save(newCart);
    }

    async addArticleToCart(cartId: number, articleId: number, quantity: number): Promise<Cart | ApiResponse>{
        let record: CartArticle = await this.cartArticle.findOne({
            cartId: cartId,
            articleId: articleId
        });

        if(!record) {
            record = new CartArticle();
            record.cartId = cartId;
            record.articleId = articleId;
            record.quantity = quantity;
            record = await this.cartArticle.save(record);
        } else {
            record.quantity += quantity;
        }

        const savedCartArticle = await this.cartArticle.save(record);

        if(!savedCartArticle) {
            return new ApiResponse("error", -6001, "Could not add article to cart.");
        }

        return await this.getById(cartId);
    }

    async getById(cartId: number): Promise<Cart>{
        return await this.cart.findOne(cartId, {
            relations: [
                "cartArticles",
                "cartArticles.article",
                "cartArticles.article.category",
                "cartArticles.article.articlePrices",
                "cartArticles.article.photos"
            ]
        });
    }

    async ChangeQuantity(cartId: number, articleId: number, newQuantity: number){
        let record = await this.cartArticle.findOne({
            cartId: cartId,
            articleId: articleId
        });

        if(record) {
            
        record.quantity = newQuantity;

        if(record.quantity === 0) {
            await this.cartArticle.delete(record.cartArticleId);
        } else {
            await this.cartArticle.save(record);
        }
     }
    }
}
