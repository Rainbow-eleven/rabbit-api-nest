import { ApiProperty } from '@nestjs/swagger';
export interface responseMsg<T, Dto> {
  message: string;
  statusCode: number;
  data?: T[] | Dto;
}

export class AuthResponse {
  @ApiProperty({
    example: 401,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Unauthorized',
  })
  message: string;
}
export class SuccessResponse {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;
  @ApiProperty({
    example: '请求成功',
  })
  message: string;
}

export class ErrorResponse {
  @ApiProperty({
    example: 500,
  })
  statusCode: number;
  @ApiProperty({
    example: '请求失败',
  })
  message: string;
}
