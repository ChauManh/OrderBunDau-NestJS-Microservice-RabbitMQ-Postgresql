import Request from 'express';
import { JwtPayload } from './jwt-payload.interface';

export interface RequestWithCookie extends Request {
  cookies: Record<string, string>;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
