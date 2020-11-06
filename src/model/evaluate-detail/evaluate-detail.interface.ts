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
  evaluateId: number;
  @ApiProperty({
    description: '故障表主键Id',
    type: Number,
    example: 1,
  })
  malfId: number;
  @ApiProperty({
    description: '故障选项Id',
    type: Number,
    example: 1,
  })
  optionId: number;
}
