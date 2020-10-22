import { Users } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(
    // 注入UsersService，所以需要import UsersModule
    // 底下的provider才能被注入
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async createToken(user: UserDto) {
    const payload = { account: user.account, password: user.password };
    const data: UserDto[] = await this.userRepository.query(
      `select * from users where account = '${user.account}'`,
    );
    let valid = bcrypt.compareSync(user.password, data[0].password);
    if (!valid) {
      return { code: 500, msg: '登录失败,请重新输入账号或密码', data: '' };
    } else {
      return { 
        msg: '登录成功',
        data: {
          user: data[0],
          //得到token
          token: this.jwtService.sign(payload),
        },
      };
    }
  }
}
