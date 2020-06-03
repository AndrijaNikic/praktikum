import * as Validator from 'class-validator';

export class LoginAdministratorDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[a-z][a-z0-9\-\.]{2,30}[a-z0-9]$/)
    username: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2, 64)
    password: string;
}