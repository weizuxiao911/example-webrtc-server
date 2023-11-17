import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { FsService } from './fs.service'
import { FsResponse } from './fs.types'
import { FsInterceptor } from './fs.interceptor'

@Controller('/fs')
@UseInterceptors(FsInterceptor)
// @UseGuards(FsGuard)
export class FsController {

  constructor(private readonly fsService: FsService) { }

  @Post(':path')
  @ApiOperation({ description: '保存目录或文件' })
  async save(@Param('path') path: string, @Query() query: any): Promise<void> {
    const { createAsFile } = query
    return !createAsFile ? this.fsService.mkdir(path) : this.fsService.touch(path)
  }

  @Put(':path')
  @ApiOperation({ description: '写入文件内容' })
  async write(@Param('path') path: string, @Body() body: any): Promise<void> {
    const { content } = body
    return this.fsService.write(path, content)
  }

  @Delete(':path')
  @ApiOperation({ description: '删除目录或文件' })
  async remove(@Param('path') path: string,): Promise<void> {
    return this.fsService.delete(path)
  }

  @Get(':path')
  @ApiOperation({ description: '获取目录或文件' })
  @ApiBody({ type: FsResponse })
  async content(@Param('path') path: string, @Query() query: any): Promise<FsResponse | FsResponse[]> {
    const { recursive } = query
    return this.fsService.content(path, recursive)
  }

}
