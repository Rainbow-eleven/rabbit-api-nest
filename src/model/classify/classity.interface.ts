import { ApiProperty } from '@nestjs/swagger';
export class ClassifyDto {
  @ApiProperty({
    description: '类型名称'
  })
  classifyName: string;

  @ApiProperty({
    description: '图标'
  })
  icon: string

  @ApiProperty({
    description: '大图标'
  })
  bigIcon: string

  @ApiProperty({
    description: '描述'
  })
  description: string

  @ApiProperty({
    description: '状态'
  })
  status: number

  @ApiProperty({
    description: '是否删除'
  })
  isDelete: number
}
