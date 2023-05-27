import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  public constructor(private readonly service: UsersService) {}

  @Get()
  public async getAll() {
    return this.service.users({})
  }

  @Post()
  public async createUser(@Body() user: CreateUserDto) {
    return this.service.createUser(user)
  }

  @Get('/:id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.user({ id })
  }
}
