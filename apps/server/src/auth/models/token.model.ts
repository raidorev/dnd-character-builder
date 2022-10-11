import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJWT } from 'graphql-scalars'

@ObjectType()
export class Token {
  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  public accessToken: string

  @Field(() => GraphQLJWT, { description: 'JWT refresh token' })
  public refreshToken: string
}
