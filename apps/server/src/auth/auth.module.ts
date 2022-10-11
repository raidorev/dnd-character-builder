import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { Config, SecurityConfig } from '@/common/config/configuration.interface'
import { UsersService } from '@/users/users.service'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { PasswordService } from './password.service'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService<Config, true>) => {
        const { jwtAccessSecret, jwtTokenExpiresIn } =
          configService.get<SecurityConfig>('security')
        return {
          secret: jwtAccessSecret,
          signOptions: {
            expiresIn: jwtTokenExpiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver, UsersService, PasswordService],
})
export class AuthModule {}
