import { NestMiddleware, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "dtos/auth/jwt.data.dto";
import { jwtSecret } from "config/jwt.secret";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private administratorService: AdministratorService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        if(!req.headers.authorization){
            throw new HttpException('The token does not exist.', HttpStatus.UNAUTHORIZED);
        }

        const tokenParts = req.headers.authorization.split(' ');
        if(tokenParts.length !== 2){
            throw new HttpException('The token does not exist.', HttpStatus.UNAUTHORIZED);
        }

        const token = tokenParts[1];

        let jwtData: JwtDataDto;
        
        try {
        jwtData = jwt.verify(token, jwtSecret);
        } catch (e) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        
        if(!jwtData){
            throw new HttpException('The token does not exist.', HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ip !== req.ip.toString()){
            throw new HttpException('The token does not exist.', HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ua !== req.headers['user-agent']){
            throw new HttpException('The token does not exist.', HttpStatus.UNAUTHORIZED);
        }

        const administrator = await this.administratorService.getById(jwtData.administratorId)
        if(!administrator){
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }

        const sada = new Date();
        if(jwtData.exp < sada.getTime() / 1000.){
            throw new HttpException('The token has expired.', HttpStatus.UNAUTHORIZED);
        }

        next();
    }

}