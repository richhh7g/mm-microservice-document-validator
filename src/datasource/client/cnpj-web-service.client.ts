import axios, { AxiosRequestConfig } from 'axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CNPJWebServiceResponseDTO } from './cnpj-web-service.dto';

export interface CNPJWebServiceClient {
  request<Data = CNPJWebServiceResponseDTO>(
    options: Omit<AxiosRequestConfig, 'baseUrl'>,
  ): Promise<Data>;
}

@Injectable()
export class CNPJWebServiceClientImpl implements CNPJWebServiceClient {
  private readonly baseUrl = this.configService.get<string>(
    'CNPJ_DATA_SOURCE_URL',
  );

  constructor(private readonly configService: ConfigService) {}

  async request<Data>(
    options: Omit<AxiosRequestConfig, 'baseUrl'>,
  ): Promise<Data> {
    const headers = options.headers;

    try {
      const result = await axios.request<Data>({
        ...options,
        baseURL: this.baseUrl,
        headers,
      });

      return result.data;
    } catch (err) {
      Logger.error(err);

      throw new HttpException(
        'Ocorreu um erro inesperado no sistema.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
