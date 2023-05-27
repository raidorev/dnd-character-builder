import { ApiProperty } from '@nestjs/swagger'
import { Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @Length(1, 255)
  public email: string

  @ApiProperty()
  @Length(6, 255)
  public password: string
}
