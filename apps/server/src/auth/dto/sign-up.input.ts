import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  public email: string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  public password: string
}
