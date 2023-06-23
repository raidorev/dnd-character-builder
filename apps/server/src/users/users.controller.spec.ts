import { faker } from '@faker-js/faker'
import { createMock } from '@golevelup/ts-jest'
import { Test } from '@nestjs/testing'
import { User } from '@prisma/client'

import { UsersController } from './users.contoller'
import { UsersService } from './users.service'

const users = Array.from({ length: 10 }).map(
  () =>
    ({
      id: faker.number.int(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    } as User),
)

const user = users[2]

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return createMock<UsersService>({
            users: jest.fn().mockResolvedValue(users),
            user: jest.fn().mockResolvedValue(user),
          })
        }

        return createMock(token)
      })
      .compile()

    controller = module.get(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getAll', () => {
    it('should return an array of users', async () => {
      expect(await controller.getAll()).toBe(users)
    })
  })

  describe('getOne', () => {
    it('should return a user', async () => {
      const { id } = user

      expect(await controller.getOne(id)).toBe(user)
    })
  })
})
