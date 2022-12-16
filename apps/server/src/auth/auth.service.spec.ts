import { createMock } from '@golevelup/ts-jest'
import { ConflictException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma, User } from '@prisma/client'
import chance from 'chance'
import { PartialDeep } from 'type-fest'

import { SecurityConfig } from '@/common/config/configuration.interface'
import { UsersService } from '@/users/users.service'

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
        email: random.email(),
        password: random.string(),
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

      const email = random.email()
      await service.signUp({
        email,
        password: random.string(),
      })

      await expect(
        service.signUp({
          email,
          password: random.string(),
        }),
      ).rejects.toThrow(ConflictException)
    })
  })
})
