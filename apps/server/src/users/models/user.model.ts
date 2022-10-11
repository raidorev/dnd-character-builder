import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => Int)
  public id: number

  @Field()
  public email: string

  @Field()
  public password: string

  @Field()
  public createAt: Date

  @Field()
  public updatedAt: Date
}
