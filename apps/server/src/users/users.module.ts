import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  providers: [PrismaService, UsersService, UsersResolver],
})
export class UsersModule {}
