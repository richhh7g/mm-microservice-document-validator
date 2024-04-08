import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentValidationController } from 'src/api/controller';
import { CNPJWebServiceClientImpl } from 'src/datasource/client';
import { DocumentValidateUseCaseImpl } from 'src/usecase/document';
import { CNPJHTTPDataSourceImpl } from 'src/datasource/cnpj';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [DocumentValidationController],
  providers: [
    {
      provide: 'DocumentValidateUseCase',
      useClass: DocumentValidateUseCaseImpl,
    },
    {
      provide: 'CNPJHTTPDataSource',
      useClass: CNPJHTTPDataSourceImpl,
    },
    {
      provide: 'CNPJWebServiceClient',
      useClass: CNPJWebServiceClientImpl,
    },
  ],
})
export class AppModule {}
