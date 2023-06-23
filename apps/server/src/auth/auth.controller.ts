import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { Token } from './interfaces/token.interface'

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() signUpDto: SignUpDto): Promise<Token> {
    return this.authService.signUp(signUpDto)
  }

  @Post('sign-in')
  public async signIn(@Body() singInDto: SignInDto): Promise<Token> {
    return this.authService.signIn(singInDto)
  }
}
