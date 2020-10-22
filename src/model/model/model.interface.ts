import { Classify } from './../classify/classify.entity';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { Brand } from '../brand/brand.entity';

export class ModelDto {
  @ApiProperty({
    description: '型号名称',
    required: true,
  })
  modelName: string;

  @ApiProperty({
    description: '品牌ID',
    required: true,
  })
  brandId: Brand;

  @ApiProperty({
    description: '类型ID',
    required: true,
  })
  classifyId: Classify;

  @ApiProperty({
    description: '当前行情价格',
    required: true,
  })
  exchangePrice: number;

  @ApiProperty({
    description: '最高价',
    required: true,
  })
  topPrice: number;

  @ApiProperty({
    description: '封面图片',
    example: 'https://czh1010.oss-cn-beijing.aliyuncs.com/OIP.jpg',
  })
  faceImg: string;

  @ApiProperty({
    description: '内容图片',
  })
  contentImg: [];

  @ApiProperty({
    description: '描述',
    example: '此商品暂时没有任何描述。',
  })
  description: string;

  @ApiProperty({
    description: '状态',
    default: 1,
    enum: [0, 1],
  })
  status: number;
}
