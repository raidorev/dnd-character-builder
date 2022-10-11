export interface NestConfig {
  port: number
}

export interface DatabaseConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
}

export interface SecurityConfig {
  saltRounds: number
  jwtAccessSecret: string
  jwtRefreshSecret: string
  jwtTokenExpiresIn: string
}

export interface Config {
  env: 'development' | 'production' | 'test'
  nest: NestConfig
  database: DatabaseConfig
  security: SecurityConfig
}
