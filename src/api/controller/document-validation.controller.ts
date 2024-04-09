import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Response } from 'express';
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
  @ApiTags('Documents')
  @ApiBody({
    description: 'Check if document is valid',
    type: CheckDocumentBodyDTO,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CheckDocumentResponseDTO,
    description: 'Returns if document is valid or not',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: ErrorResponse,
    description: 'Error: Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse,
    description: 'Error: Internal Server Error',
  })
  @ApiSecurity('API_KEY', ['x-api-key'])
  async checkDocument(
    @Body() body: CheckDocumentBodyDTO,
    @Res() res: Response,
  ): Promise<CheckDocumentResponseDTO | ErrorResponse> {
    try {
      const response = await this.usecase.exec(body.cnpj);

      res.status(HttpStatus.OK).json({ isValid: response });
    } catch (err) {
      Logger.error(err);

      return { errors: [err.message] };
    }
  }
}
