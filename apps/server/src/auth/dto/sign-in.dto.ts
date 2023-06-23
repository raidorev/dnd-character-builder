import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  public email: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  public password: string
}
