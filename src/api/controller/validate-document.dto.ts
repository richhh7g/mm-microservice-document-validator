import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CheckDocumentBodyDTO {
  @ApiProperty({
    example: '10490181000569',
    description: 'CNPJ to validate',
    minimum: 14,
    maximum: 14,
  })
  @IsString({ message: 'CNPJ must be a string' })
  @Length(14, 14, { message: 'CNPJ must have 14 characters' })
  cnpj: string;
}

export class CheckDocumentResponseDTO {
  @ApiProperty()
  isValid: boolean;
}
