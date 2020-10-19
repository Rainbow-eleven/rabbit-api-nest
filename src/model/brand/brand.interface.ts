import { ApiProperty } from "@nestjs/swagger";

export class BrandDto {
  @ApiProperty({
    description: '品牌名称'
  })
  brandName: string;

  @ApiProperty({
    description: '品牌logo',
    example: "https://tse4-mm.cn.bing.net/th/id/OIP.xbMiTPgzbz32rV9jW8bEgwAAAA?w=180&h=180&c=7&o=5&pid=1.7"
  })
  logo: string

  @ApiProperty({
    description: '描述'
  })
  description: string

  @ApiProperty({
    description: '状态',
    example: 1
  })
  status?: number

  @ApiProperty({
    description: '创建人',
    example: null
  })
  createdUserId?: number

  @ApiProperty({
    description: '修改人',
    example: null
  })
  updatedUserId?: number

  @ApiProperty({
    description: '是否删除',
    example: 0
  })
  isDelete?: number
}