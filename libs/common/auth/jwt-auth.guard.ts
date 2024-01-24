import { AUTH_SERVICE } from '@app/common/constants/services';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map, tap } from 'rxjs';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log(
    //   `test => ${JSON.stringify(context.switchToHttp().getRequest())}`,
    // );
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    console.log(`jwt===>${jwt}`);
    if (!jwt) {
      return false;
    }
    return this.authClient.send('authenticate', { Authentication: jwt }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true),
    );
  }
}
