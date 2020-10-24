import { ApiProperty } from '@nestjs/swagger';
import { Malfunction } from '../malfunction/malfunction.entity';
import { Malfunction_options } from '../malo/malo.entity';
import { Evaluate } from './../evaluate/evaluate.entity';
export class EvaluateDetailDto {
  @ApiProperty({
    description: '评估信息Id',
    type: Number,
    example: 1,
  })
  evaluateId: Evaluate;
  @ApiProperty({
    description: '故障表主键Id',
    type: Number,
    example: 1,
  })
  malfId: Malfunction;
  @ApiProperty({
    description: '故障选项Id',
    type: Number,
    example: 1,
  })
  optionId: Malfunction_options;
  @ApiProperty({
    description: '故障选项名称',
    type: String,
  })
  optionName: string;
}
