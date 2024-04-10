import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MM Document Microservice')
    .setVersion('1.0.0')
    .setLicense(
      'MIT',
      'https://github.com/richhh7g/microservico-veracidade-notas/blob/main/LICENSE',
    )
    .setContact(
      'Richhh7g',
      'https://github.com/richhh7g',
      'richhh7g@protonmail.com',
    )
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'API_KEY')
    .addTag('Documents', 'Operations about documents')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
