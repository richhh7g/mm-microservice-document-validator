export interface CNPJWebServiceResponseDTO {
  razao_social: string;
  estabelecimento: {
    cnpj: string;
    situacao_cadastral: string;
  };
}
