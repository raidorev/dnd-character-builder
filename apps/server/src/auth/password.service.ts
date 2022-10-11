import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hash, compare } from 'bcrypt'

import { Config, SecurityConfig } from '@/common/config/configuration.interface'

@Injectable()
export class PasswordService {
  public constructor(
    private readonly configService: ConfigService<Config, true>,
  ) {}

  public hashPassword(password: string): Promise<string> {
    const { saltRounds } = this.configService.get<SecurityConfig>('security')
    return hash(password, saltRounds)
  }

  public comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}
