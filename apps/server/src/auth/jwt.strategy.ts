import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { Config, SecurityConfig } from '@/common/config/configuration.interface'

import { AuthService } from './auth.service'
import { JwtDto } from './dto/jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Config, true>,
  ) {
    const { jwtAccessSecret } = configService.get<SecurityConfig>('security')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtAccessSecret,
    })
  }

  public async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUser(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
