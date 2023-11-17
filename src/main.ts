import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import config from './config'

const logger = new Logger('Main')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const server = await config.get('server')
  const options = new DocumentBuilder()
    .setTitle(server?.title ?? '')
    .setDescription(server?.description ?? '')
    .setVersion(server?.version ?? '1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(server?.documentURL ?? '/api/doc', app, document)
  app.enableCors()
  const port = getPort() ?? (server?.port ?? 5000)
  logger.log(`server listen on ${port}`)
  await app.listen(port)
}

// 获取端口
function getPort(): number | undefined {
  const args = process.argv.slice(2);
  const portArgIndex = args.findIndex((arg) => arg.startsWith('--port='));
  if (portArgIndex !== -1) {
    const portStr = args[portArgIndex].split('=')[1];
    return parseInt(portStr, 10);
  }
  return undefined;
}

// 在这里可以进行一些全局异常处理的操作，比如记录日志或者发送警报等等  
process.on('uncaughtException', function (err) {
  logger.error(err)
})

bootstrap()
