import * as Validator from 'class-validator';

export class AddAdministratorDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-z][a-z0-9\-\.]{2,30}[a-z0-9]$/)
    username: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(6, 64)
    password: string;
}