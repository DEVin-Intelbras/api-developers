import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupApiDocs } from './common/api-docs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpExceptionFilter } from './core/http/http-exception.filter';
import { TransformerInterceptor } from './core/http/http-response';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('@nestjs/class-transformer'),
    }),
  );

  setupApiDocs(app);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformerInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(PORT).then(() => {
    Logger.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
