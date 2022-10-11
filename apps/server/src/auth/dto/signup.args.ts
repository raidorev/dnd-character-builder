import { Field, ArgsType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

@ArgsType()
export class SignupInput {
  @Field()
  @IsEmail()
  public email: string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  public password: string
}
