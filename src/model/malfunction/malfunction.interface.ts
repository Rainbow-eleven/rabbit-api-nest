import { ApiProperty } from '@nestjs/swagger';
import { Model } from '../model/model.entity';

export class MalfunctionDto {
  @ApiProperty({
    description: '商品模型ID',
    type: Number,
  })
  modelId: Model;
  @ApiProperty({
    description: '故障名称',
    type: String,
  })
  title: string;
  @ApiProperty({
    description: '是否有提示',
    example: 0,
    type: Number,
  })
  isHint: number;
  @ApiProperty({
    description: '提示信息标题',
    example: '',
    type: String,
  })
  hintTitle: string;
  @ApiProperty({
    description: '提示信息',
    example: '',
    type: String,
  })
  hintInfo: string;
  @ApiProperty({
    description: '提示图片',
    example: '',
    type: String,
  })
  hintImg: string;
  @ApiProperty({
    description: '维修最高价',
    example: 0,
    type: Number,
  })
  maintainTopPrice: number;
}
