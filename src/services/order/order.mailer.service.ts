import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Order } from "src/entities/order.entity";
import { MailConfigugarion } from "config/mail.configuration";

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

    createOrderHtml(Order: Order): string {
        let suma = 0;

        for(let cartArticle of Order.cart.cartArticles) {
            const price = cartArticle.article.price;
            suma += price;
        }

        return `<p>Postovani, </p>
                <p>Hvala za Vasu porudzbinu.</p>
                <p>Ovo su stavke Vase porudzbine:</p>
                <ul>
                    ${Order.cart.cartArticles.map(cA => {
                        return `<li>${ cA.article.name} x ${cA.quantity}</li>`
                    })}
                <ul>
                <p>Ukupno za uplatu: ${suma.toFixed(2) } EUR</p>`;
    }
}