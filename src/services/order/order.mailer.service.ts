import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Order } from "src/entities/order.entity";
import { MailConfigugarion } from "config/mail.configuration";
import { CartArticle } from "src/entities/cart-article.entity";

@Injectable()
export class OrderMailerService {
    constructor(private readonly mailerService: MailerService) { }

    async sendOrderEmail(order: Order) {
        await this.mailerService.sendMail({
            to: order.cart.note,
            bcc: MailConfigugarion.orderReceivedEmail,
            encoding: 'UTF-8',
            subject: 'Vasa porudzbina je primljena.',
            html: this.createOrderHtml(order),
        });
    }

    createOrderHtml(order: Order): string {
        let suma = order.cart.cartArticles.reduce((sum, current: CartArticle) => {
            return sum = current.quantity * current.article.price
        }, 0);

        for(let cartArticle of order.cart.cartArticles) {
            const price = cartArticle.article.price;
            suma += price;
        }

        return `<p>Postovani, </p>
                <p>Hvala za Vasu porudzbinu.</p>
                <p>Ovo su stavke Vase porudzbine:</p>
                <ul>
                    ${order.cart.cartArticles.map((cA: CartArticle) => {
                        return `<li>${ cA.article.name} x ${cA.quantity}</li>`;
                    }).join("")}
                </ul>
                <p>Ukupno za uplatu: ${suma.toFixed(2) } EUR</p>`;
    }
}