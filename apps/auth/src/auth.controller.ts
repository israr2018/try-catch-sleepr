import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  @UseGuards(AuthGuard)
  @Post()
 async  login(): string {
    return 'hello world';
  }
}
