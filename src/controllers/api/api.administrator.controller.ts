import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from '../../services/administrator/administrator.service';
import { AddAdministratorDto } from 'dtos/add.administrator.dto';
import { EditAdministratorDto } from 'dtos/edit.administrator.dto';
import { ApiResponse } from 'misc/api.response.class';

@Controller('api/administrator')
export class ApiAdministratorController {

  constructor(
    private administratorService: AdministratorService
  ){}

//   @Get()
//   getHomePage(): string {
//     return 'Hello World!';
//   }

//   @Get('/contact')
//   getContactPage(): string{
//     return 'Contact details: ';
//   }
//   @Get('/usage')
//   getUsagePage(): string{
//     return 'You can do the following: ';
//   }

  @Get()
  getAllAdmins(): Promise<Administrator[]> {
    return this.administratorService.getAll();
  }

  @Get(':id')
  getAdministrator(@Param('id') id: number): Promise<Administrator> {
    return this.administratorService.getById(id);
  }

  @Put()
  add(@Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse>{
    return this.administratorService.add(data);
  }

  @Post(':id')
  editById(@Param('id') id: number, @Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse>{
      return this.administratorService.editById(id, data);
  }

}