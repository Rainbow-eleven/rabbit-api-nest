import { ApiProperty } from '@nestjs/swagger';
export class ClassifyDto {
  @ApiProperty({
    description: '类型名称',
  })
  classifyName: string;

  @ApiProperty({
    description: '图标',
    example:
      'https://tse4-mm.cn.bing.net/th/id/OIP.kNVeGWuDQ7wNp5BORJkhwQAAAA?w=173&h=180&c=7&o=5&pid=1.7',
  })
  icon: string;

  @ApiProperty({
    description: '大图标',
  })
  bigIcon: string;

  @ApiProperty({
    description: '描述',
  })
  description: string;

  @ApiProperty({
    description: '状态',
    example: 1,
  })
  status?: number;

  @ApiProperty({
    description: '创建人',
    example: null,
  })
  createdUserId?: number;

  @ApiProperty({
    description: '修改人',
    example: null,
  })
  updatedUserId?: number;

  @ApiProperty({
    description: '是否删除',
    example: 0,
  })
  isDelete?: number;
}

export class ResponseAllClassifys {
  @ApiProperty({
    type: [ClassifyDto],
  })
  data: Array<ClassifyDto>;
  @ApiProperty({
    example: 200,
  })
  statusCode: number;
  @ApiProperty({
    example: '查询成功',
  })
  message: string;
}

export class ResponseClassifyOne {
  @ApiProperty({
    type: ClassifyDto,
  })
  data: ClassifyDto;
  @ApiProperty({
    example: 200,
  })
  statusCode: number;
  @ApiProperty({
    example: '查询成功',
  })
  message: string;
}
