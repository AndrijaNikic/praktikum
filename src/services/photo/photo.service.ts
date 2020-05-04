import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Photo } from "entities/photo.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
    constructor(@InjectRepository(Photo) private readonly photo: Repository<Photo>){
        super(photo);
    }

    async add(newPhoto: Photo): Promise<Photo>{
        return await this.photo.save(newPhoto);
    }
}