import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { Config, NestConfig } from './common/config/configuration.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService<Config, true>)
  const { port } = configService.get<NestConfig>('nest')

  const config = new DocumentBuilder()
    .setTitle('Eventyr API')
    // TODO: Add description
    .setDescription('There will be a description here')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port)
}
void bootstrap()
