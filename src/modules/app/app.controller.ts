import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('app')
@Controller('public')
export class AppController {
  @Get()
  healthCheck(): string {
    return 'API ON';
  }
}
