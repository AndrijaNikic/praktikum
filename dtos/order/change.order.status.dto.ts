import * as Validator from 'class-validator';

export class ChangeOrderStatusDto {
    @Validator.IsNotEmpty()
    @Validator.IsIn(["rejected", "accepted", "shipped", "pending"])
    newStatus: "rejected" | "accepted" | "shipped" | "pending";
}