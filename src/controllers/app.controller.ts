import { Controller, Get, Param } from '@nestjs/common';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from '../services/administrator/administrator.service';

@Controller()
export class AppController {

  constructor(
    private administratorService: AdministratorService
  ){}

  @Get()
  getHomePage(): string {
    return 'Hello World!';
  }

  @Get('/contact')
  getContactPage(): string{
    return 'Contact details: ';
  }
  @Get('/usage')
  getUsagePage(): string{
    return 'You can do the following: ';
  }

  @Get('api/administrator')
  getAllAdmins(): Promise<Administrator[]> {
    return this.administratorService.getAll();
  }

  @Get('api/administrator/:id')
  getAdministrator(@Param('id') id: number): Promise<Administrator> {
    return this.administratorService.getById(id);
  }
}
