import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateArchiveDTO } from './create-archive-dto';
import { UpdateAllowListDTO } from './update-allow-list.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('archive')
  crateArchive(@Body() body: CreateArchiveDTO) {
    return this.appService.createArchive(body);
  }

  @Post('update-allow-list')
  updateAllowList(@Body() body: UpdateAllowListDTO) {
    return this.appService.updateAllowList(body);
  }
}
