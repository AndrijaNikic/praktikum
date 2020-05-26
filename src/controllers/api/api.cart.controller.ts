import { Controller, Get, Req, Post, Body, Patch } from "@nestjs/common";
import { CartService } from "src/services/cart/cart.service";
import { Cart } from "src/entities/cart.entity";
import { Request } from "express";
import { AddArticleToCartDto } from "dtos/cart/add.article.to.cart.dto";
import { ApiResponse } from "misc/api.response.class";
import { EditArticleInCartDto } from "dtos/cart/edit.article.in.cart.dto";
import { Order } from "src/entities/order.entity";
import { OrderService } from "src/services/order/order.service";

@Controller('cart/')
export class ApiCartController {
    constructor(
        private cartService: CartService,
        private orderService: OrderService
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

    @Patch()
    async changeQuantity(@Body() data: EditArticleInCartDto, orderId: number){
        const cart = await this.getCartByOrderId(orderId);
        return await this.cartService.changeQuantity(cart.cartId, data.articleId, data.quantity);
    }

    @Post('makeOrder')
    async makeOrder(orderId: number): Promise<Order | ApiResponse> {
        const cart = await this.getCartByOrderId(orderId);
        return await this.orderService.add(cart.cartId);
    }
}