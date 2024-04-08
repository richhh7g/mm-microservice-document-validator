import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CNPJHTTPDataSource } from 'src/datasource/cnpj';

export interface DocumentValidateUseCase {
  exec(document: string): Promise<boolean>;
}

@Injectable()
export class DocumentValidateUseCaseImpl implements DocumentValidateUseCase {
  constructor(
    @Inject('CNPJHTTPDataSource')
    private readonly datasource: CNPJHTTPDataSource,
    private readonly configService: ConfigService,
  ) {}

  async exec(document: string): Promise<boolean> {
    const result = await this.datasource.findCNPJ(document);

    const comparableCNPJ = this.configService.get<string>('MM_CNPJ');

    return result.cnpj === comparableCNPJ;
  }
}
