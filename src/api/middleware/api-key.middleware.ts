import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from 'src/api/response';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    const response: ErrorResponse = {
      errors: ['API key inválida.'],
    };
    if (!apiKey) {
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    const apiKeyEnv = this.configService.get<string>('API_KEY');
    if (apiKey !== apiKeyEnv) {
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    next();
  }
}
