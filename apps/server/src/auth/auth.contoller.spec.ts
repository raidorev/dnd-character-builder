import { faker } from '@faker-js/faker'
import { createMock } from '@golevelup/ts-jest'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, User } from '@prisma/client'
import { PartialDeep } from 'type-fest'

import { SecurityConfig } from '@/common/config/configuration.interface'
import { UsersService } from '@/users/users.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PasswordService } from './password.service'

const users: User[] = Array.from({ length: 10 }).map((_, id) => ({
  id,
  email: faker.internet.email(),
  password: faker.lorem.word(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}))
const oneUser = users[0]

describe('AuthResolver', () => {
  let resolver: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
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
                throw new Prisma.PrismaClientKnownRequestError('Conflict', {
                  code: 'P2002',
                  meta: { target: ['email'] },
                  clientVersion: '2.0.0',
                })
              }

              users.push(user)
              return Promise.resolve(user)
            },
          }),
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>({
            sign: jest.fn().mockReturnValue(faker.string.alpha()),
          }),
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>({
            get: jest.fn().mockReturnValue({
              jwtAccessSecret: faker.string.alphanumeric(),
              jwtRefreshSecret: faker.string.alphanumeric(),
              jwtTokenExpiresIn: faker.date.future().toString(),
            } as PartialDeep<SecurityConfig>),
          }),
        },
        {
          provide: PasswordService,
          useValue: createMock<PasswordService>({
            hashPassword: jest
              .fn()
              .mockReturnValue(faker.string.alphanumeric()),
            comparePassword: jest.fn().mockReturnValue(true),
          }),
        },
      ],
    }).compile()

    resolver = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect.hasAssertions()
    expect(resolver).toBeDefined()
  })
})
