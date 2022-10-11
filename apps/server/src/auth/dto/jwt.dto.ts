export interface JwtDto {
  /**
   * Subject (whom token refers to)
   */
  sub: number
  /**
   * Issued at
   */
  iat: number
  /**
   * Expiration time
   */
  exp: number
}
