import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    required: false,
    example: null,
  })
  id?: number;
  @ApiProperty()
  account: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  userName?: string;
  @ApiProperty()
  isAuthentication?: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  cardNo?: string;
  @ApiProperty()
  faceUrl?: string;
  @ApiProperty({
    required: false,
  })
  createdTime?: Date;
  @ApiProperty({ required: false })
  updatedTime?: Date;
}
export class ResponseAllData {
  @ApiProperty({
    type: [UserDto],
  })
  data: Array<UserDto>;
  @ApiProperty()
  total: number;
}
export class ResponseData {
  @ApiProperty({
    type: UserDto,
  })
  data: UserDto;
  @ApiProperty({
    example: 200,
  })
  statusCode: number;
  @ApiProperty({
    example: '查询成功',
  })
  message: string;
}
export class UserErrorResponse{
  @ApiProperty({
    example: 500,
  })
  statusCode: number;
  @ApiProperty({
    example: '该账户已经被注册',
  })
  message: string;
}
export class UserSuccessResponse{
  @ApiProperty({
    example: 500,
  })
  statusCode: number;
  @ApiProperty({
    example: '注册成功',
  })
  message: string;
}