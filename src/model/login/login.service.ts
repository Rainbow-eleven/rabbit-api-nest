import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.interface';

@Injectable()
export class LoginService {
  constructor(
    // 注入UsersService，所以需要import UsersModule
    // 底下的provider才能被注入
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: UserDto) {
    const payload = { account: user.account, password: user.password };
    //在实际项目中一般要进行数据库验证查看用户用户名密码是否正确
    const data = await this.userService.findOne({
      account: user.account,
      password: user.password,
    });
    if (!data) {
      return { code: 500, msg: '登录失败', data: '' };
    } else {
      return {
        msg: '登录成功',
        data: {
          user: user,
          //得到token
          token: this.jwtService.sign(payload),
        },
      };
    }
  }
}
