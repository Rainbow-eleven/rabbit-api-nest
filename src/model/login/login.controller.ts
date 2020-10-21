import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProduces, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/user.interface';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('login')
@ApiTags('登录')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  loginUser(@Body() user: UserDto) {
    return this.loginService.createToken(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('verify')
  @ApiBody({
    description: '输入信息',
    type: UserDto,
  })
  verifyUser(@Req() req) {
    return req.user;
  }
}
