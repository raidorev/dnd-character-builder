import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { SignInInput } from './dto/sign-in.input'
import { SignUpInput } from './dto/sign-up.input'
import { Token } from './models/token.model'

@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  public async signUp(@Args('input') input: SignUpInput): Promise<Token> {
    return this.authService.signUp(input)
  }

  @Mutation(() => Token)
  public async signIn(@Args('input') input: SignInInput): Promise<Token> {
    return this.authService.signIn(input)
  }
}
