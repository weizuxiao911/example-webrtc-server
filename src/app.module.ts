import { Module } from '@nestjs/common'
import { FsModule } from './fs/fs.module'
import { KubeModule } from './kube/kube.module'
import { AppGateway } from './app.gateway'
import { TestModule } from './test/test.module';

@Module({
  imports: [FsModule, KubeModule, TestModule],
  providers: [AppGateway]
})
export class AppModule { }
