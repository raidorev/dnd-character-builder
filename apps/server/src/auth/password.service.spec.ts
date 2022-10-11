import { createMock } from '@golevelup/ts-jest'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { PartialDeep } from 'type-fest'

import { SecurityConfig } from '@/common/config/configuration.interface'

import { PasswordService } from './password.service'

describe('PasswordService', () => {
  let service: PasswordService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>({
            get(key: string) {
              if (key === 'security') {
                return {
                  saltRounds: 10,
                } as PartialDeep<SecurityConfig>
              }

              throw new Error(
                `Unexpected key in mocked ConfigService.get: ${key}`,
              )
            },
          }),
        },
      ],
    }).compile()

    service = module.get<PasswordService>(PasswordService)
  })

  it('should be defined', () => {
    expect.hasAssertions()
    expect(service).toBeDefined()
  })

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      expect.hasAssertions()

      const password = 'password'
      const hashedPassword = await service.hashPassword(password)
      expect(hashedPassword).not.toStrictEqual(password)
    })
  })

  describe('comparePassword', () => {
    it('should compare a password', async () => {
      expect.hasAssertions()

      const password = 'password'
      const hashedPassword = await service.hashPassword(password)
      const isMatch = await service.comparePassword(password, hashedPassword)
      expect(isMatch).toBe(true)
    })

    it('should not compare a password', async () => {
      expect.hasAssertions()

      const password = 'password'
      const hashedPassword = await service.hashPassword(password)
      const isMatch = await service.comparePassword('wrong', hashedPassword)
      expect(isMatch).toBe(false)
    })
  })
})
