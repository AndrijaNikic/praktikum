import { Controller, Post, Body, Req } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { LoginAdministratorDto } from "dtos/login.administrator.dto";
import { ApiResponse } from "misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoAdministratorDto } from "dtos/login.info.administrator.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "dtos/auth/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
// import { UserRegistrationDto } from "dtos/user/user.registration.dto";

@Controller('auth')
export class AuthController{
    constructor(public administratorService: AdministratorService,
        //  public userService: UserService
         ) { }

    @Post('administrator/login')
    async doLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoAdministratorDto | ApiResponse> {
        const administrator = await this.administratorService.getByUsername(data.username);

        if(!administrator) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }

        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(administrator.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
        }

        const jwtData = new JwtDataDto();
        jwtData.administratorId = administrator.administratorId;
        jwtData.username = administrator.username;
        
        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimeStamp = sada.getTime() / 1000;
        jwtData.exp = istekTimeStamp;

        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];

        let token: string =jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoAdministratorDto(
            administrator.administratorId,
            administrator.username,
            token
        );

        return new Promise(resolve => resolve(responseObject));
    }

    // @Post('user/register')
    // async userRegister(@Body() data: UserRegistrationDto){
    //     return await this.userService.register(data);
    // } 

    
}

