import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryPhoto } from "src/entities/category-photo.entity";

@Injectable()
export class CategoryPhotoService extends TypeOrmCrudService<CategoryPhoto> {
    constructor(@InjectRepository(CategoryPhoto) private readonly categoryPhoto: Repository<CategoryPhoto>){
        super(categoryPhoto);
    }

    async add(newPhoto: CategoryPhoto): Promise<CategoryPhoto>{
        return await this.categoryPhoto.save(newPhoto);
    }

    async deleteById(id: number) {
        return await this.categoryPhoto.delete(id);
    }
}