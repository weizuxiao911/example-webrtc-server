import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

const logger = new Logger('FsInterceptor')

@Injectable()
export class FsInterceptor implements NestInterceptor {

    /**
     * 拦截
     * @param context 
     * @param next 
     * @returns 
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next
            .handle()
            .pipe(
                tap(() => logger.log(`After... ${Date.now() - now}ms`)),
            )
    }
}