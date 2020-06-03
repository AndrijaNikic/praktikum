import * as Validator from 'class-validator';

export class EditAdministratorDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2, 64)
    password: string;
}