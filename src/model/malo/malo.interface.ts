import { ApiProperty } from '@nestjs/swagger';
import { Malfunction } from '../malfunction/malfunction.entity';
import { Model } from '../model/model.entity';

export class MaloDto {
  @ApiProperty({
    description: '商品模型ID',
    type: Number,
  })
  modelId: number;

  @ApiProperty({
    description: '故障信息ID',
    type: Number,
  })
  malfunctionId: number;

  @ApiProperty({
    description: '名称',
    type: String,
  })
  optionName: string;

  @ApiProperty({
    description: '处理方式（1:维修,2:更换配件）',
    example: 1,
    type: Number,
  })
  processType: number;

  @ApiProperty({
    description: '本项问题价格占比（最大100）',
    example: 0,
    type: Number,
  })
  ratio: number;
}
