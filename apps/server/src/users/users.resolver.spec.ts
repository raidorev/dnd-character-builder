import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import chance from 'chance'

import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

const random = chance()

const users: User[] = Array.from({ length: 10 }).map((_, id) => ({
  id,
  email: random.email(),
  password: random.hash(),
  createdAt: random.date(),
  updatedAt: random.date(),
}))
const oneUser = users[0]

describe('UsersResolver', () => {
  let resolver: UsersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            user: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it('should be defined', () => {
    expect.hasAssertions()
    expect(resolver).toBeDefined()
  })

  describe('user', () => {
    it('should return a user', async () => {
      expect.hasAssertions()

      const user = await resolver.user(1)
      expect(user).toStrictEqual(oneUser)
    })
  })
})
