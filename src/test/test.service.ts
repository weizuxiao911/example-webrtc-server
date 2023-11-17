import { Injectable } from '@nestjs/common';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

@Injectable()
export class TestService {

    async test(text: string): Promise<any> {
        const p = unified()
        .use(remarkParse)
        return p.parse(text)
    }

}
