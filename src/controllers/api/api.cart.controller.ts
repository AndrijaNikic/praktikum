import { Controller, Get, Req, Post, Body } from "@nestjs/common";
import { CartService } from "src/services/cart/cart.service";
import { Cart } from "src/entities/cart.entity";
import { Request } from "express";
import { AddArticleToCartDto } from "dtos/cart/add.article.to.cart.dto";
import { ApiResponse } from "misc/api.response.class";

@Controller('cart/')
export class ApiCartController {
    constructor(
        private cartService: CartService
    ) { }

    private async getCartByOrderId(orderId: number): Promise<Cart> {
        let cart =  await this.cartService.getLastCartByOrderId(orderId);

        if(!cart) {
            cart = await this.cartService.createNewCart();
        }

        return await this.cartService.getById(cart.cartId);
    }

    @Get()
    async getCart(orderId: number): Promise<Cart> {
        return await this.getCartByOrderId(orderId);
        
    }

    @Post('addToCart/')
    async addToCart(@Body() data: AddArticleToCartDto, orderId: number): Promise<Cart | ApiResponse>{
        const cart = await this.getCart(orderId);

        if(!cart) {
            return new ApiResponse("error", -6001, "Could not add article to cart.");
        }

        return await this.cartService.addArticleToCart(cart.cartId, data.articleId, data.quantity );
    }
}