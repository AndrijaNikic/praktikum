import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHomePage(): string {
    return 'Hello World!';
  }

  @Get('/contact')
  getContactPage(): string{
    return 'Contact details...';
  }
  @Get('/usage')
  getUsagePage(): string{
    return 'You can do the following: ';
  }
}
