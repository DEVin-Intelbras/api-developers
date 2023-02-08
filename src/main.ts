import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupApiDocs } from './common/api-docs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('@nestjs/class-transformer'),
    }),
  );

  setupApiDocs(app);

  await app.listen(PORT).then(() => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
