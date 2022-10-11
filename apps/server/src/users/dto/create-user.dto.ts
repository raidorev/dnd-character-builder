import { Length } from 'class-validator'

export class CreateUserDto {
  @Length(1, 255)
  public email: string

  @Length(6, 255)
  public password: string
}
