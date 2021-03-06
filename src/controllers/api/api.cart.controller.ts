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

    cartId = 50;

    private async getActiveCartByCartId(cartId: number): Promise<Cart>{
        let cart =  await this.cartService.getLastActiveCartByCartId(cartId);

        if(!cart) {
            cart = await this.cartService.createNewCart();
        }

        return await this.cartService.getById(cart.cartId);
    }

    private async getCartByCartId(cartId: number): Promise<Cart> {
        // let cart =  await this.cartService.getLastActiveCartByCartId(cartId);

        // if(!cart) {
        //     cart = await this.cartService.createNewCart();
        // }

        // return await this.cartService.getById(cart.cartId);
        cartId = 51;
        return await this.getActiveCartByCartId(cartId);
        
    }

    @Get()
    async getCart(cartId: number): Promise<Cart> {
        return await this.getCartByCartId(cartId);
        
    }

    @Post('addToCart/')
    async addToCart(@Body() data: AddArticleToCartDto, cartId: number): Promise<Cart | ApiResponse> {
        const cart = await this.getActiveCartByCartId(cartId);

        cartId = 51;

        return await this.cartService.addArticleToCart(cart.cartId, data.articleId, data.quantity);
    }

    @Patch()
    async changeQuantity(@Body() data: EditArticleInCartDto, cartId: number){
        const cart = await this.getCartByCartId(cartId);
        return await this.cartService.changeQuantity(cart.cartId, data.articleId, data.quantity);
    }

    @Post('makeOrder')
    async makeOrder(cartId: number): Promise<Order | ApiResponse> {
        const cart = await this.getCartByCartId(cartId);
        return await this.orderService.add(cart.cartId);
    }
}