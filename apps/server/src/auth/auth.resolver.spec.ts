import { createMock } from '@golevelup/ts-jest'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, User } from '@prisma/client'
import chance from 'chance'
import { PartialDeep } from 'type-fest'

import { SecurityConfig } from '@/common/config/configuration.interface'
import { UsersService } from '@/users/users.service'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { PasswordService } from './password.service'

const random = chance()

const users: User[] = Array.from({ length: 10 }).map((_, id) => ({
  id,
  email: random.email(),
  password: random.hash(),
  createdAt: random.date(),
  updatedAt: random.date(),
}))
const oneUser = users[0]

describe('AuthResolver', () => {
  let resolver: AuthResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>({
            user: jest.fn().mockResolvedValue(oneUser),
            createUser: (data) => {
              const user = {
                ...data,
                id: users.length,
                createdAt: new Date(),
                updatedAt: new Date(),
              }

              if (users.some((u) => u.email === user.email)) {
                throw new Prisma.PrismaClientKnownRequestError(
                  'Conflict',
                  'P2002',
                  '',
                )
              }

              users.push(user)
              return Promise.resolve(user)
            },
          }),
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>({
            sign: jest.fn().mockReturnValue(random.string()),
          }),
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>({
            get: jest.fn().mockReturnValue({
              jwtAccessSecret: random.string(),
              jwtRefreshSecret: random.string(),
              jwtTokenExpiresIn: random.string(),
            } as PartialDeep<SecurityConfig>),
          }),
        },
        {
          provide: PasswordService,
          useValue: createMock<PasswordService>({
            hashPassword: jest.fn().mockReturnValue(random.string()),
            comparePassword: jest.fn().mockReturnValue(true),
          }),
        },
      ],
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)
  })

  it('should be defined', () => {
    expect.hasAssertions()
    expect(resolver).toBeDefined()
  })
})
