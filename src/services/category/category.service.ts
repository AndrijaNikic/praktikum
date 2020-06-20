import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "misc/api.response.class";
import { EditCategoryDto } from "dtos/category/edit.category.dto";
import { AddCategoryDto } from "dtos/category/add.category.dto";

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
    constructor(
        @InjectRepository(Category) private readonly category: Repository<Category>){
        super(category);
    }

    async createFullCategory(data: AddCategoryDto): Promise<Category | ApiResponse> {
        let newCategory: Category = new Category();

        newCategory.name = data.name;
        newCategory.imagePath = data.imagePath;
        newCategory.description = data.description;
        newCategory.measurement = data.measurement;

        let savedCategory = await this.category.save(newCategory);

        return await this.category.findOne(savedCategory.categoryId, {
            relations: [
                "categoryPhotos"
            ]
        });
    }

    async editById(id:number, data: EditCategoryDto) {
        const existingCategory: Category = await this.category.findOne(id);
        if(!existingCategory) {
            return new ApiResponse('error', -5005, 'Category not found.');
        }

        existingCategory.name = data.name;
        existingCategory.imagePath = data.imagePath;
        existingCategory.description = data.description;
        existingCategory.measurement = data.measurement;

        const savedCategory: Category = await this.category.save(existingCategory);
        if(!savedCategory) {
            return new ApiResponse('error', -5006, 'Could not save new category.');
        }

        return await this.category.findOne(id, {
            relations: ['categoryPhotos']
        });
    }

}
