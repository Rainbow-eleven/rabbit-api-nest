import { responseMsg } from 'src/service/interface';
import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../user/user.interface';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './login.interface';
class DataType {
  @ApiProperty()
  user: UserDto;
  @ApiProperty()
  token: string;
}
class ResponseLogin {
  @ApiProperty()
  message: string;
  @ApiProperty({
    example: 200,
  })
  status: number;
  @ApiProperty()
  data: DataType;
}
class ResponseBad {
  @ApiProperty()
  message: string;
  @ApiProperty({
    example: 500,
  })
  status: number;
  @ApiProperty()
  data: string;
}

@Controller('login')
@ApiTags('登录')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post('/:account/:password')
  @ApiParam({
    name: 'password',
    example: '123456',
    description: '密码',
    required: true,
  })
  @ApiParam({
    name: 'account',
    example: 'qiu3291002845@gmail.com',
    description: '账号',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '请求成功',
    type: ResponseLogin,
  })
  @ApiBadGatewayResponse({
    status: 500,
    description: '请求失败',
    type: ResponseBad,
  })
  loginUser(@Param() user: LoginDto) {
    return this.loginService.createToken(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  // @Post('verify')
  @ApiBody({
    description: '输入信息',
    type: UserDto,
  })
  verifyUser(@Req() req) {
    return req.user;
  }
}
