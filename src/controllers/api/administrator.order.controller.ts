import { OrderService } from "src/services/order/order.service";
import { Param, Get, Patch, Body, Controller } from "@nestjs/common";
import { ApiResponse } from "misc/api.response.class";
import { Order } from "src/entities/order.entity";
import { ChangeOrderStatusDto } from "dtos/order/change.order.status.dto";

@Controller('api/order')
export class AdministratorOrderController {
    constructor(
        private orderService: OrderService
    ) { }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Order | ApiResponse> {
        const order = await this.orderService.getById(id);

        if(!order) {
            return new ApiResponse("error", -8001, "No such order found.");
        }

        return order;
    }

    @Patch(':id')
    async changeStatus(@Param('id') id: number, @Body() data: ChangeOrderStatusDto): Promise<Order | ApiResponse> {
        return await this.orderService.changeStatus(id, data.newStatus);
    }
}