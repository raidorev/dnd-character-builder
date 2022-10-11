import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { Config, NestConfig } from './common/config/configuration.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService<Config, true>)
  const { port } = configService.get<NestConfig>('nest')

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port)
}
void bootstrap()
