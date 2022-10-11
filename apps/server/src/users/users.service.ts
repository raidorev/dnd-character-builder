import { Injectable } from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class UsersService {
  public constructor(private readonly prisma: PrismaService) {}

  public async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | undefined> {
    return (
      (await this.prisma.user.findUnique({ where: userWhereUniqueInput })) ??
      undefined
    )
  }

  public async users(parameters: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = parameters
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  public async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  public async updateUser(parameters: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = parameters
    return this.prisma.user.update({ data, where })
  }

  public async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where })
  }
}
