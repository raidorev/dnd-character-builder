import { faker } from '@faker-js/faker'
import { createMock } from '@golevelup/ts-jest'
import { ConflictException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, User } from '@prisma/client'
import { PartialDeep } from 'type-fest'

import { SecurityConfig } from '@/common/config/configuration.interface'
import { UsersService } from '@/users/users.service'

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

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect.hasAssertions()
    expect(service).toBeDefined()
  })

  describe('signup', () => {
    it('should create a user and return tokens', async () => {
      expect.hasAssertions()

      const tokens = await service.signUp({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      expect(tokens).toStrictEqual(
        expect.objectContaining({
          accessToken: expect.any(String) as string,
          refreshToken: expect.any(String) as string,
        }),
      )
    })

    it('should throw ConflictException if the email is already in use', async () => {
      expect.hasAssertions()

      const email = faker.internet.email()
      await service.signUp({
        email,
        password: faker.internet.password(),
      })

      await expect(
        service.signUp({
          email,
          password: faker.internet.password(),
        }),
      ).rejects.toThrow(ConflictException)
    })
  })
})
