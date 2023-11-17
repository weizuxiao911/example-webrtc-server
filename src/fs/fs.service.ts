import { HttpException, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as p from 'path'
import { FsResponse } from './fs.types'

@Injectable()
export class FsService {

  /**
   * 创建目录
   * @param path 
   */
  async mkdir(path: string): Promise<void> {
    if (fs.existsSync(path) && (await fs.promises.stat(path)).isDirectory()) {
      throw new HttpException('目录已存在', 403)
    }
    await fs.promises.mkdir(path, { recursive: true })
  }

  /**
   * 创建文件
   * @param path 
   */
  async touch(path: string): Promise<void> {
    if (fs.existsSync(path) && (await fs.promises.stat(path)).isFile()) {
      throw new HttpException('文件已存在', 403)
    }
    const parent = p.parse(path)
    if (parent?.dir && !fs.existsSync(parent?.dir)) {
      await this.mkdir(parent?.dir)
    }
    await fs.promises.writeFile(path, Buffer.from('', 'base64'))
  }

  /**
   * 写入文件
   * @param path 
   * @param content 
   */
  async write(path: string, content: string): Promise<void> {
    const parent = p.parse(path)
    if (parent?.dir && !fs.existsSync(parent?.dir)) {
      await this.mkdir(parent?.dir)
    }
    await fs.promises.writeFile(path, Buffer.from(content, 'base64'))
  }

  /**
   * 删除目录或文件
   * @param path 
   */
  async delete(path: string): Promise<void> {
    if (!fs.existsSync(path)) {
      throw new HttpException('目录或文件不存在', 404)
    }
    await fs.promises.rm(path, { recursive: true })
  }

  /**
   * 获取目录或文件
   * @param path 
   */
  async content(path: string, recursive: boolean): Promise<FsResponse | FsResponse[]> {
    if (!fs.existsSync(path)) {
      throw new HttpException('指定内容不存在', 404)
    }
    const stat = await fs.promises.stat(path)
    if (stat.isFile()) {
      const f = p.parse(path)
      const text = await fs.promises.readFile(path, 'base64')
      const item: FsResponse = {
        file: encodeURIComponent(path),
        name: `${f.name}${f.ext ?? ''}`,
        path: path,
        isDirectory: false,
        size: stat.size,
        content: text
      }
      return item
    }
    return await this.directory(path, recursive)
  }

  /**
   * 获取目录结构
   * @param path 
   */
  async directory(path: string, recursive: boolean): Promise<FsResponse[]> {
    const filenames = await fs.promises.readdir(path)
    const data = filenames.map(async filename => {
      const file = p.join(path, filename)
      const stat = await fs.promises.stat(file)
      const item: FsResponse = {
        file: encodeURIComponent(file),
        name: filename,
        path: file,
        isDirectory: stat.isDirectory(),
        size: stat.size,
      }
      if (recursive && stat.isDirectory()) {
        item.children = await this.directory(file, recursive)
      }
      return item
    })
    return await Promise.all(data)
  }

}
