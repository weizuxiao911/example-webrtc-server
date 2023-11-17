import { Body, Controller, Param, Post } from '@nestjs/common'
import { KubeService } from './kube.service'

@Controller('kube')
export class KubeController {

    constructor(
        private readonly kubeService: KubeService
    ) { }

    @Post(':yaml')
    async apply(@Param('yaml') yaml: string, @Body() options): Promise<any> {
        console.log(yaml)
        return await this.kubeService.exec('kubectl', ['apply', '-f', yaml], {})
    }


}
