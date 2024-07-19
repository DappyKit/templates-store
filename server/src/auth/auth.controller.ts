import { Body, Controller, Post, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/database/entities/user.entity';
import { isEmpty } from 'src/utilities/isEmpty';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
   async signIn(@Body() status: any): Promise<User> {
    if(isEmpty(status)){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'No data provided',
      }, HttpStatus.BAD_REQUEST, {
        cause: new Error()
      });
    }
   return this.authService.signIn(status);
  }
}
