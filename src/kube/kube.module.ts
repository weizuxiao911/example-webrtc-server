import { Module } from '@nestjs/common'
import { KubeService } from './kube.service'
import { KubeController } from './kube.controller'

@Module({
  providers: [KubeService],
  controllers: [KubeController]
})
export class KubeModule {}
