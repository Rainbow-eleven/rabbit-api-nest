import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  id?: number;
  @ApiProperty({
    description: "账号",
    required: true,
    example: "admin"
  })
  account: string;

  @ApiProperty({
    description: "密码",
    required: true,
    example: "123456"
  })
  password: string;
  userName?: string;
  isAuthentication?: number;
  name?: string;
  cardNo?: string;
  faceUrl?: string;
  time: string;
}