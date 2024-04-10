import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { CNPJWebServiceResponseDTO } from './cnpj-web-service.dto';

export interface CNPJWebServiceClient {
  request<Data = CNPJWebServiceResponseDTO>(
    options: Omit<AxiosRequestConfig, 'baseUrl'>,
  ): Promise<AxiosResponse<Data, any>>;
}

@Injectable()
export class CNPJWebServiceClientImpl {
  private readonly baseUrl: string;

  constructor(
    private readonly httpClient: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('CNPJ_DATA_SOURCE_URL');
  }

  async request<Data = CNPJWebServiceResponseDTO>(
    options: Omit<AxiosRequestConfig, 'baseUrl'>,
  ): Promise<AxiosResponse<Data, any>> {
    const headers = options.headers;

    try {
      const result = this.httpClient.request<Data>({
        ...options,
        baseURL: this.baseUrl,
        headers,
      });

      return await firstValueFrom(result);
    } catch (err) {
      Logger.error(err);

      throw new HttpException(
        'Ocorreu um erro inesperado no sistema.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
