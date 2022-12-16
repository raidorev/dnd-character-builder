import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  public email: string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  public password: string
}
