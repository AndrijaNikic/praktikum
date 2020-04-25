import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { Repository } from 'typeorm';
import { AddAdministratorDto } from 'dtos/add.administrator.dto';
import { EditAdministratorDto } from 'dtos/edit.administrator.dto';
import * as crypto from 'crypto';
import { ApiResponse } from 'misc/api.response.class';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly administrator: Repository<Administrator>
    ){}

    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }

    async getByUsername(username: string): Promise<Administrator | null>{
        const admin = await this.administrator.findOne({
            username: username
        });

        if(admin){
            return admin;
        }
        
        return null;
    }

    getById(id: number): Promise<Administrator> {
        return this.administrator.findOne(id);
    }

    add(data: AddAdministratorDto): Promise<Administrator | ApiResponse>{
        
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;


        return new Promise(resolve => {
            this.administrator.save(newAdmin)
            .then(data => resolve(data))
            .catch(() => resolve(new ApiResponse("error", -1001)));
        });

    }

    async editById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiResponse>{
        let oldAdmin: Administrator = await this.administrator.findOne(id);

        if(oldAdmin === undefined){
            return new Promise(resolve => resolve(new ApiResponse("error", -2001)));
        }

        
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        oldAdmin.passwordHash = passwordHashString;

        return this.administrator.save(oldAdmin);


    }
}
