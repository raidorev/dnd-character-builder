import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { UsersService } from './users.service'

const users: User[] = Array.from({ length: 10 }).map((_, id) => ({
  id,
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}))
const oneUser = users[0]

const prisma = {
  user: {
    findMany: jest.fn().mockResolvedValue(users),
    findUnique: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockReturnValue(oneUser),
    update: jest.fn().mockResolvedValue(oneUser),
    delete: jest.fn().mockResolvedValue(oneUser),
  },
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  describe('user', () => {
    it('should return a user', async () => {
      expect.hasAssertions()

      const user = await service.user({ id: 1 })
      expect(user).toStrictEqual(oneUser)
    })
    it('should return undefined if user not found', async () => {
      expect.hasAssertions()

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(undefined)
      const user = await service.user({ id: 100 })
      expect(user).toBeUndefined()
    })
  })

  describe('users', () => {
    it('should return an array of users', async () => {
      expect.hasAssertions()

      const users = await service.users({})
      expect(users).toStrictEqual(users)
    })
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      expect.hasAssertions()

      const user = await service.createUser({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      expect(user).toStrictEqual(oneUser)
    })
  })

  describe('updateUser', () => {
    it('should update a user', async () => {
      expect.hasAssertions()

      const user = await service.updateUser({
        where: { id: 1 },
        data: { email: faker.internet.email() },
      })
      expect(user).toStrictEqual(oneUser)
    })
  })

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      expect.hasAssertions()

      const user = await service.deleteUser({ id: 1 })
      expect(user).toStrictEqual(oneUser)
    })
  })
})
