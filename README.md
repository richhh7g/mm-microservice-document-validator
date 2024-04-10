# Microserviço de Veracidade de Documentos

## Descrição

O Microserviço de Verificação de Documentos é uma aplicação desenvolvida para validar a autenticidade e integridade de diversos tipos de documentos.

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

Utilize uma ApiKey para acessar o microserviço, no header da requisição: `x-api-key: {APIKEY}`

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
