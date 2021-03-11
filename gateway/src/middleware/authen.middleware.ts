import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headerAuthentication = req.headers.authorization;
    if(!headerAuthentication) throw new UnauthorizedException('Authorization failed!');
    const token = req.headers.authorization.split(' ')[1];
    if(token) {
      next();
    }else {
      throw new UnauthorizedException('Authorization failed!');
    }
  }
}
