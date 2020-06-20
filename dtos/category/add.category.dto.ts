import * as Validator from 'class-validator';

export class AddCategoryDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 128)
    name: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2, 128)
    imagePath: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10, 1000)
    description: string;

    @Validator.IsNotEmpty()
    @Validator.IsIn(["unit", "gram"])
    measurement: "unit" | "gram";

}