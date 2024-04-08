import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ErrorResponse } from 'src/api/response';
import { DocumentValidateUseCase } from 'src/usecase/document';
import {
  CheckDocumentBodyDTO,
  CheckDocumentResponseDTO,
} from './validate-document.dto';

@Controller('/valida')
export class DocumentValidationController {
  constructor(
    @Inject('DocumentValidateUseCase')
    private readonly usecase: DocumentValidateUseCase,
  ) {}

  @Post()
  async checkDocument(
    @Body() body: CheckDocumentBodyDTO,
  ): Promise<CheckDocumentResponseDTO | ErrorResponse> {
    try {
      const response = await this.usecase.exec(body.cnpj);

      return { isValid: response };
    } catch (err) {
      Logger.error(err);

      return { error: [err.message] };
    }
  }
}
