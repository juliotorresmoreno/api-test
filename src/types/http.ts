

import { Request } from 'express';
import { UserDocument } from '../models/@types'

export interface RequestWithSession extends Request {
  query: any,
  params: any,
  session?: {
    token: TokenJWT,
    user: UserDocument
  }
}

export interface TokenJWT {
  id: string
  email: string
  iat: number
  expire: number
  exp: number
}