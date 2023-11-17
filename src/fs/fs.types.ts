import { ApiBody, ApiParam, ApiProperty } from "@nestjs/swagger"

export class FsResponse {
    @ApiProperty({name: 'ID'})
    file?: string
    @ApiProperty({name: '名称'})
    name?: string
    @ApiProperty({name: '路径'})
    path?: string
    @ApiProperty({name: '是否为目录'})
    isDirectory?: boolean
    @ApiProperty({name: '大小'})
    size?: number
    @ApiProperty({name: '子目录或子文件'})
    children?: FsResponse[]
    @ApiProperty({name: '文件内容'})
    content?: string
}
