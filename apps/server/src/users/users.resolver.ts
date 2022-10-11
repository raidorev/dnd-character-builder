import { Args, Int, Query, Resolver } from '@nestjs/graphql'

import { User } from './models/user.model'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UsersResolver {
  public constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  public user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.user({ id })
  }

  @Query(() => [User])
  public users() {
    return this.usersService.users({})
  }
}
