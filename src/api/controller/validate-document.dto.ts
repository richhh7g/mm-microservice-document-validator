import { ApiProperty } from '@nestjs/swagger';

export class CheckDocumentBodyDTO {
  @ApiProperty({
    example: '10490181000569',
    description: 'CNPJ to validate',
    minimum: 14,
    maximum: 14,
  })
  cnpj: string;
}

export class CheckDocumentResponseDTO {
  @ApiProperty()
  isValid: boolean;
}
