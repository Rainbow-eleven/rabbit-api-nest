import { ApiProperty } from "@nestjs/swagger";
import { Malfunction } from "../malfunction/malfunction.entity";
import { Model } from "../model/model.entity";

export class MaloDto{
  @ApiProperty({
    description: '商品模型ID',
    type: Number,
  })
  modelId: Model;

  @ApiProperty({
    description: '故障信息ID',
    type: Number,
  })
  malfId: Malfunction;
  
  @ApiProperty({
    description: '名称',
    type: String,
  })
  optionName: string;

  @ApiProperty({
    description: '选项内容',
    type: String,
  })
  optionContent: string;

  @ApiProperty({
    description: '是否有提示（0:否,1:是）',
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