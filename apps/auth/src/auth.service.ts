import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDocument } from './users/models/user.schema';
import { TokenPayLoad } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async setAuthenticationCookie(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayLoad = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();

    console.log('calling setAuthenticationCookie1');
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    console.log('calling setAuthenticationCookie2');

    const token = this.jwtService.sign(tokenPayload);
    console.log('calling setAuthenticationCookie3');
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
    console.log('calling setAuthenticationCookie4');
    console.log('calling setAuthenticationCookie5');
    return token;
  }
}
