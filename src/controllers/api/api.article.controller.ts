import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req, Delete, Patch } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { ArticleService } from "src/services/article/article.servise";
import { Article } from "src/entities/article.entity";
import { AddArticleDto } from "dtos/article/add.article.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageConfig } from "config/storage.config";
import { diskStorage } from "multer";
import { PhotoService } from "src/services/photo/photo.service";
import { Photo } from "src/entities/photo.entity";
import { ApiResponse } from "misc/api.response.class";
import * as fileType from 'file-type';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { EditArticleDto } from "dtos/article/edit.article.dto";

@Controller('api/article')
@Crud({
    model: { type : Article},
    params: { id: {
        field: 'articleId',
        type: 'number',
        primary: true
    }},
    query: {
    join: {
        category: { eager: true },
        photos: { eager: true}
    }
},
    routes: {
        exclude: [ 
            'updateOneBase',
            'replaceOneBase',
            'deleteOneBase'
        ]
    }

})

export class ArticleController {
    constructor(
        public service: ArticleService,
        public photoService: PhotoService) { }
    
    @Post('createFull')
    createFullArticle(@Body() data: AddArticleDto){
        return this.service.createFullArticle(data);
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
    async uploadPhoto(@Param('id') articleId: number, @UploadedFile() photo, @Req() req): Promise<ApiResponse | Photo> {

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

        const newPhoto: Photo = new Photo();
        newPhoto.articleId = articleId;
        newPhoto.imagePath = photo.filename;
        
        const savedPhoto = await this.photoService.add(newPhoto);
        if(!savedPhoto){
            return new ApiResponse('error', -4001);
        }

        return savedPhoto;

    }

    async createThumb(photo) {
        await this.createResizedImage(photo, StorageConfig.photo.resize.thumb);

    }

    async createSmall(photo) {
        await this.createResizedImage(photo, StorageConfig.photo.resize.small);
    }

    async createResizedImage(photo, resizeSettings){
        const originalFilePath = photo.path;
        const fileName = photo.filename;

        const destinationFilePath = StorageConfig.photo.destination +
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

    @Delete(':articleId/deletePhoto/:photoId')
    async deletePhoto(@Param('articleId') articleId: number, @Param('photoId') photoId: number) {
        const photo = await this.photoService.findOne({
            photoId: photoId,
            articleId: articleId
        });

        if(!photo) {
            return new ApiResponse('error', -4004, 'Photo not found.');
        }

        try{
        fs.unlinkSync(StorageConfig.photo.destination + photo.imagePath);
        fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.thumb.directory + photo.imagePath);
        fs.unlinkSync(StorageConfig.photo.destination + StorageConfig.photo.resize.small.directory + photo.imagePath);
        } catch (e) { } 

        const deleteResult = await this.photoService.deleteById(photoId);
        if(!deleteResult.affected) {
            return new ApiResponse('error', -4004, 'Photo not found.');
        }

        return new ApiResponse('ok', 0, 'One photo has been deleted.');

    }

    @Patch(':id')
    async editById(@Param('id') id: number, @Body() data: EditArticleDto) {
        return await this.service.editById(id, data);

    }

}