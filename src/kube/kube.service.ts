import { HttpException, Injectable } from '@nestjs/common'
import { spawn } from 'child_process'

const cmd = 'kubectl'

@Injectable()
export class KubeService {

    async exec(cmd: string, args: string[], options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!cmd && !args) {
                reject(new HttpException('请完善请求', 400))
            }
            const exec = spawn(cmd, args, options ?? {})
            console.log(cmd, args.join(' '))
            let out = ''
            let error = ''
            exec.stdout.on('data', data => {
                out += data
            })
            exec.stderr.on('data', error => {
                error += error
            })
            exec.on('close', (code: number, signal: any) => {
                console.log(out)
                console.log(error)
                reject({ out, error })
            })
        })
    }

    async apply(yaml: string, namespace?: string) {
        const args = ['apply', '-f', yaml]
        if (namespace) {
            args.push(...['-n', namespace])
        }
        
    }

}
