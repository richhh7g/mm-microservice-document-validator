# Microserviço de Veracidade de Documentos

## Descrição

O Microserviço de Verificação de Documentos é uma aplicação desenvolvida para validar a autenticidade e integridade de diversos tipos de documentos.

## O que foi utilizado no projeto?

No projeto, foram adotadas as seguintes tecnologias e práticas:

**Framework**: O projeto foi desenvolvido utilizando o `NestJS`, combinando a robustez do `Node.js` com a tipagem e estruturação oferecidas pelo `TypeScript`.

**Arquitetura Limpa (Clean Architecture)**: Foram seguidos os princípios da Arquitetura Limpa para garantir um código organizado, desacoplado e de fácil manutenção.

**SOLID**: Foi utilizado os princípios do SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation e Dependency Inversion) para desenvolver um código mais coeso, flexível e fácil de manter.

**Cache Local**: Foi implementado um sistema de cache local para armazenar os dados consultados, visando melhorar a performance e reduzir o tempo de resposta.

**Datasource**: Um datasource foi implementado para realizar a validação do CNPJ, proporcionando uma integração eficiente e confiável com os dados externos.

**Timeout**: Foi adicionado um timeout para a requisição HTTP, garantindo que o sistema não fique bloqueado caso ela demore demais para retornar.

**Swagger**: A API foi documentada utilizando o Swagger, facilitando o entendimento e a utilização.

**Docker**: Foi utilizado para criar um ambiente de desenvolvimento consistente e portátil, permitindo que o projeto seja facilmente executado e distribuído em diferentes ambientes.

## Instalando dependências do projeto

```sh
npm install
```

## Executando o projeto

#### Desenvolvimento

```sh
npm run start:dev
```

#### Produção

```sh
npm run build
npm run start
```

## Segurança

Adicione uma ApiKey para acessar o microserviço, no header da requisição: `x-api-key: {APIKEY}`

## Rotas

### Validar documento

```sh
POST /validar
Content-Type: application/json
x-api-key: {APIKEY}

{
  "cnpj": "string"
}
```

## Documentação completa com Swagger

Acesse: [http://localhost:{PORT}/docs](http://localhost:{PORT}/docs)

## Docker

#### Executando com o Docker

```sh
docker build -t mm-microservice-document-validator:latest .
docker run -p 3000:3000 mm-microservice-document-validator
```

#### Executando com o Docker Compose

```sh
docker compose up
```

Por favor, crie um arquivo chamado `.env` na raiz do projeto para configurar as variáveis de ambiente necessárias.

## Pendências no Projeto

**Testes**: Não foi implementado nenhum teste de unidade, integração ou end-to-end. Criar testes adequados é crucial para garantir que o código funcione como esperado e seja confiável.

**Centralização de Textos**: A falta de um local central para armazenar todos os textos do projeto, faz com que os textos sejam repetidos ou  em vários lugares, o que não é muito eficiente. Mesmo que seja apenas para o português, implementar uma internacionalização já seria de grande ajuda.
