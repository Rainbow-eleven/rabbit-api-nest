import { ApiProperty } from '@nestjs/swagger';
import { Model } from '../model/model.entity';

export class EvaluateDto {
  @ApiProperty({
    description: '商品型号ID',
    required: true,
    type: Number,
    example: 1,
  })
  modelId: number;

  @ApiProperty({
    description: '订金金额',
    required: true,
  })
  subscription: number;

  @ApiProperty({
    description: '维修估价',
    required: true,
  })
  price: number;

  @ApiProperty({
    description: '备注',
  })
  remark?: string;
}
