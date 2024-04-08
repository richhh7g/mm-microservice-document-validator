import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['X-API-Key'];

    if (!apiKey) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'API key inválida.' });
    }

    if (apiKey !== process.env.API_KEY) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'API key inválida.' });
    }

    next();
  }
}
