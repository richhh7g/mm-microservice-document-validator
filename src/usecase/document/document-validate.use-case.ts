import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CNPJHTTPDataSource } from 'src/datasource/cnpj';

export interface DocumentValidateUseCase {
  exec(document: string): Promise<boolean>;
}

const TWENTY_SECONDS = 20 * 1000;
const CACHE_KEY = 'document';

@Injectable()
export class DocumentValidateUseCaseImpl implements DocumentValidateUseCase {
  constructor(
    @Inject('CNPJHTTPDataSource')
    private readonly datasource: CNPJHTTPDataSource,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async exec(document: string): Promise<boolean> {
    const expectedDocument = this.configService.get<string>('MM_CNPJ');

    const cachedDocument = await this.cacheManager.get<string>(
      `${CACHE_KEY}:${document}`,
    );
    if (cachedDocument) {
      return cachedDocument === expectedDocument;
    }

    const datasourceResult = await this.datasource.findCNPJ(document);

    const isDocumentEqualToExpected =
      datasourceResult.cnpj === expectedDocument;

    await this.cacheManager.set(
      `${CACHE_KEY}:${document}`,
      isDocumentEqualToExpected ? datasourceResult.cnpj : document,
      TWENTY_SECONDS,
    );

    return isDocumentEqualToExpected || document === expectedDocument;
  }
}
