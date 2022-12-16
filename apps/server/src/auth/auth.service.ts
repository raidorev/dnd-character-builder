import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Prisma, User } from '@prisma/client'

import { Config, SecurityConfig } from '@/common/config/configuration.interface'
import { UsersService } from '@/users/users.service'

import { SignInInput } from './dto/sign-in.input'
import { SignUpInput } from './dto/sign-up.input'
import { Token } from './models/token.model'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  public constructor(
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config, true>,
  ) {}

  public validateUser(id: number): Promise<User | undefined> {
    return this.usersService.user({ id })
  }

  public async signUp(payload: SignUpInput): Promise<Token> {
    const password = await this.passwordService.hashPassword(payload.password)

    try {
      const user = await this.usersService.createUser({
        email: payload.email,
        password,
      })

      return this.generateTokens({ sub: user.id })
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already exists`)
      }

      throw error
    }
  }

  public async signIn({ email, password }: SignInInput): Promise<Token> {
    const user = await this.usersService.user({ email })

    if (!user) {
      throw new UnprocessableEntityException(
        'User with this email does not exist',
      )
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new UnprocessableEntityException('Invalid password')
    }

    return this.generateTokens({ sub: user.id })
  }

  private generateTokens(payload: { sub: number }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  private generateAccessToken(payload: { sub: number }): string {
    return this.jwtService.sign(payload)
  }

  private generateRefreshToken(payload: { sub: number }): string {
    const { jwtRefreshSecret, jwtTokenExpiresIn } =
      this.configService.get<SecurityConfig>('security')
    return this.jwtService.sign(payload, {
      secret: jwtRefreshSecret,
      expiresIn: jwtTokenExpiresIn,
    })
  }
}
