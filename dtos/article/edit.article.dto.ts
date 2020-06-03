import * as Validator from 'class-validator';

export class EditArticleDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 128)
    name: string;

    categoryId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(64, 1000)
    description: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2, 128)
    imagePath: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(64, 1000)
    ingredients: string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
    price: number;
}