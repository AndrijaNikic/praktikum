import { Controller, Post, Body, Patch, Param, Delete, UploadedFile, Req, UseInterceptors } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/entities/category.entity";
import { CategoryService } from "src/services/category/category.service";
import { CategoryPhotoService } from "src/services/category-photo/category-photo.service";
import { AddCategoryDto } from "dtos/category/add.category.dto";
import { EditCategoryDto } from "dtos/category/edit.category.dto";
import { ApiResponse } from "misc/api.response.class";
import { CategoryPhoto } from "src/entities/category-photo.entity";
import { StorageConfig } from "config/storage.config";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller('api/category')
@Crud({
    model: {
        type: Category
    },
    params: {
        id: {
            field: 'categoryId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            categories: { eager: true },
            articles: { eager: false},
            categoryPhotos: { eager: true }
        }
    }
})
export class CategoryController {
    constructor(public service: CategoryService,
                public categoryPhotoService: CategoryPhotoService) { }

    @Post()
    createFullCategory(@Body() data: AddCategoryDto){
        return this.service.createFullCategory(data);
    }

    @Patch(':categoryId')
    async editById(@Param('categoryId') categoryId: number, @Body() data: EditCategoryDto) {
        return await this.service.editById(categoryId, data);

    }

    @Post(':id/uploadPhoto/')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photo.destination,
                filename: (req, file, callback) => {
                    let original: string = file.originalname;

                    let normalized = original.replace(/\s+/g, '-');
                    normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');

                    let sada = new Date();
                    let datePart = '';
                    datePart += sada.getFullYear().toString();
                    datePart += (sada.getMonth() + 1).toString();
                    datePart += sada.getDate().toString();

                    let randomPart: string =
                    new Array(10).fill(0)
                    .map(e => (Math.random() * 9).toFixed(0).toString())
                    .join('');

                    let fileName = datePart + '-' + randomPart + '-' + normalized;

                    fileName = fileName.toLocaleLowerCase();

                    callback(null, fileName);
                }
            }),

            fileFilter: (req, file, callback) => {

                if(!file.originalname.toLocaleLowerCase().match(/\.(jpg|png)$/)) {
                    req.fileFilterError = 'Bad file extension.';
                    callback(null, false);
                    return;
                }

                if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                    req.fileFilterError = 'Bad file content.';
                    callback(null, false);
                    return;
                }

                callback(null, true);
            },

            limits: {
                files: 1,
                fileSize: StorageConfig.photo.maxSize
            }
        })
    )
    async uploadPhoto(@Param('id') categoryId: number, @UploadedFile() photo, @Req() req): Promise<ApiResponse | CategoryPhoto> {

        if(req.fileFilterError) {
            return new ApiResponse('error', -4002, req.fileFilterError);
        }

        if(!photo){
            return new ApiResponse('error', -4002, 'File not uploaded.');
        }

        const fileTypeResult =  await fileType.fromFile(photo.path);
        if(!fileTypeResult) {
            fs.unlinkSync(photo.path);
            return new ApiResponse('error', -4002, 'Cannot detect file type.');
        }

        const realMimeType = fileTypeResult.mime;
        if(!(realMimeType.includes('jpeg') || realMimeType.includes('png'))) {
            fs.unlinkSync(photo.path);
            return new ApiResponse('error', -4002, 'Bad file content type.');
        }

        await this.createResizedImage(photo, StorageConfig.photo.resize.thumb);
        await this.createResizedImage(photo, StorageConfig.photo.resize.small);

        const newPhoto: CategoryPhoto = new CategoryPhoto();
        newPhoto.categoryId = categoryId;
        newPhoto.imagePath = photo.filename;
        
        const savedPhoto = await this.categoryPhotoService.add(newPhoto);
        if(!savedPhoto){
            return new ApiResponse('error', -4001);
        }

        return savedPhoto;

    }

    async createThumb(categoryPhoto) {
        await this.createResizedImage(categoryPhoto, StorageConfig.photo.resize.thumb);

    }

    async createSmall(categoryPhoto) {
        await this.createResizedImage(categoryPhoto, StorageConfig.photo.resize.small);
    }

    async createResizedImage(categoryPhoto, resizeSettings){
        const originalFilePath = categoryPhoto.path;
        const fileName = categoryPhoto.filename;

        const destinationFilePath = StorageConfig.photo.destination + "/" +
         resizeSettings.directory + fileName;

        await sharp(originalFilePath).resize({
            fit: 'cover',
            width: resizeSettings.width,
            height: resizeSettings.height,
            // background: {
            //     r: 255, g: 255, b: 255, alpha: 0.0
            // }
        })
        .toFile(destinationFilePath);
    }

    @Delete(':categoryId/deletePhoto/:categoryPhotoId')
    async deletePhoto(@Param('categoryId') categoryId: number, @Param('categoryPhotoId') photoId: number) {
        const categoryPhoto = await this.categoryPhotoService.findOne({
            photoId: photoId,
            categoryId: categoryId
        });

        if(!categoryPhoto) {
            return new ApiResponse('error', -4004, 'Photo not found.');
        }

        try{
        fs.unlinkSync(StorageConfig.photo.destination + categoryPhoto.imagePath);
        fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.thumb.directory + categoryPhoto.imagePath);
        fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.small.directory + categoryPhoto.imagePath);
        } catch (e) { } 

        const deleteResult = await this.categoryPhotoService.deleteById(photoId);
        if(!deleteResult.affected) {
            return new ApiResponse('error', -4004, 'Category photo not found.');
        }

        return new ApiResponse('ok', 0, 'One photo has been deleted.');

    }

    
    
}