import { Config } from './configuration.interface'

// We validate environment variables in the AppModule
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export default (): Config => ({
  env: process.env.NODE_ENV! as 'development' | 'production' | 'test',
  nest: {
    port: Number.parseInt(process.env.PORT!, 10),
  },
  database: {
    host: process.env.DATABASE_HOST!,
    port: Number.parseInt(process.env.DATABASE_PORT!, 10),
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  },
  security: {
    saltRounds: Number.parseInt(process.env.SALT_ROUNDS!, 10),
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    jwtTokenExpiresIn: process.env.JWT_TOKEN_EXPIRES_IN!,
  },
})
