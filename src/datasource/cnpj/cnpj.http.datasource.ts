import { Inject, Injectable, Logger } from '@nestjs/common';
import { CNPJWebServiceClient } from 'src/datasource/client';
import { CNPJResponseDTO } from './cnpj.dto';

export interface CNPJHTTPDataSource {
  findCNPJ(cnpj: string): Promise<CNPJResponseDTO>;
}

@Injectable()
export class CNPJHTTPDataSourceImpl implements CNPJHTTPDataSource {
  constructor(
    @Inject('CNPJWebServiceClient')
    private readonly client: CNPJWebServiceClient, // Rate limit of 3 requests per minute
  ) {}

  async findCNPJ(cnpj: string): Promise<CNPJResponseDTO> {
    try {
      const { data } = await this.client.request({
        url: `/${cnpj}`,
        method: 'GET',
      });

      return {
        cnpj: data.razao_social,
        companyName: data.razao_social,
        currentStatus: data.estabelecimento.situacao_cadastral === 'Ativa',
      };
    } catch (err) {
      Logger.error(err);

      throw err;
    }
  }
}
