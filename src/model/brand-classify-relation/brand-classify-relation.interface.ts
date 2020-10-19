import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../brand/brand.entity';
import { Classify } from '../classify/classify.entity';

export class BrandClassifyRelationDto {
  @ApiProperty({
    description: '品牌id',
    example: 1,
  })
  brandId: Brand;

  @ApiProperty({
    description: '类型id',
    example: 1,
  })
  classifyId: Classify;

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
