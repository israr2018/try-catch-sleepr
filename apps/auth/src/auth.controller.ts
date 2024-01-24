import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from './users/current-user-decorator';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    // At this point we know that the user is valid as it passed through the local guard and we are ready to set jwt for the User.
    // then we pas the user to login method so , jwt tokend is created and attached to the cookie
    await this.authService.setAuthenticationCookie(user, response);
    // send response back to user.
    console.log('returning response');
    response.send('You are logined successfully');
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login() {
  //   // At this point we know that the user is valid as it passed through the local guard and we are ready to set jwt for the User.
  //   // then we pas the user to login method so , jwt tokend is created and attached to the cookie
  //   return 'hi';
  // }

  // eslint-disable-next-line prettier/prettier
  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
