import { ApiProperty } from '@nestjs/swagger';
import { Users } from './../user/user.entity';
export class AppointmentDto {
  @ApiProperty({
    description: '用户Id',
    example: 1,
    type: Users,
  })
  userId: number;

  @ApiProperty({
    description: '预约邮箱',
    example: 'qiu3291002845@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: '预约日期',
    example: new Date().toLocaleString(),
  })
  appintDate: string;

  @ApiProperty({
    description: '预约时间（1:上午,2:中午,3:下午,4:晚上）',
    example: 1,
    default: 1,
    enum: [1, 2, 3, 4],
  })
  temporalInterval: number;

  @ApiProperty({
    description: '预约上门维修地址',
    example: '河北省邯郸市丛台区',
  })
  adress: string;
}
