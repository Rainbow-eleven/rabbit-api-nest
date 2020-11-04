import {
  ApiBadGatewayResponse,
  ApiBody,
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import {
  AuthResponse,
  ErrorResponse,
  responseMsg,
  SuccessResponse,
} from './../../service/interface';
import { Users } from './user.entity';
import { ApiParam, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  UserDto,
  ResponseAllData,
  UserErrorResponse,
  UserSuccessResponse,
  ResponseData,
} from './user.interface';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';
class volidatePass {
  @ApiProperty({
    required: true,
    description: 'id',
    example: 1,
  })
  id: number;
  @ApiProperty({
    required: true,
    example: '123456',
    description: '密码',
  })
  pass: string;
}


@Controller('user')
@ApiTags('用户')
@ApiResponse({
  status: 401,
  description: '没有身份,请重新登陆',
  type: AuthResponse,
})
@ApiBadGatewayResponse({
  status: 500,
  description: '请求失败',
  type: ErrorResponse,
})
export class UserController {
  constructor(private userService: UserService) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiQuery({
    name: 'keyword',
    description: '搜素关键字',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'count',
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: false,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '请求全部用户数据',
    type: ResponseAllData,
  })
  async findAll(@Query() { keyword, count, pageSize }) {
    const data:
      | Users[]
      | Users
      | responseMsg<Users, UserDto> = await this.userService.find({
      keyword,
      count,
      pageSize,
    });
    if (data instanceof Array) {
      return {
        data,
        total: (await data).length,
      };
    } else {
      return data;
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: '查询单独用户',
    type: UserDto,
  })
  @ApiParam({
    name: 'id',
    description: '输入用户ID值',
  })
  findOne(@Param('id') id: number) {
    return this.userService.find(null, id);
  }

  @Post()
  @ApiBody({
    required: true,
    type: UserDto,
    description: '注册用户',
  })
  @ApiResponse({
    status: 200,
    description: '注册成功',
    type: UserSuccessResponse,
  })
  @ApiResponse({
    status: 500,
    description: '该账户已经被注册',
    type: UserErrorResponse,
  })
  async create(@Body() user: UserDto): Promise<responseMsg<Users, UserDto>> {
    console.log(user);
    const { password } = user;
    const bcryptPass = bcrypt
      .hashSync(password, bcrypt.genSaltSync(10))
      .toString();
    user = { ...user, password: bcryptPass };
    const res = await this.userService.createOne(user);
    return res;
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '输入用户ID值',
  })
  @ApiOkResponse({
    status: 200,
    description: '请求成功',
    type: SuccessResponse,
  })
  async update(
    @Param('id') id: number,
    @Body() user: UserDto,
  ): Promise<responseMsg<Users, UserDto>> {
    // const { password } = user;
    // const bcryptPass = bcrypt
    //   .hashSync(password, bcrypt.genSaltSync(10))
    //   .toString();
    // user = { ...user, password: bcryptPass };
    const res = await this.userService.update(id, user);
    return res;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '输入用户ID值',
  })
  @ApiOkResponse({
    status: 200,
    description: '请求成功',
    type: SuccessResponse,
  })
  async delete(@Param('id') id: number): Promise<responseMsg<Users, UserDto>> {
    const res = await this.userService.deleteOne(id);
    return res;
  }

  // 校验旧密码
  @Post('volidateOldPass')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({
    description: '校验旧密码',
    type: volidatePass,
  })
  @ApiOkResponse({
    status: 200,
    description: '请求成功',
    type: SuccessResponse,
  })
  async volidateOldPass(@Body() body: volidatePass) {
    let oldPass: any = body.pass;
    const user = await this.userService.findUser(body.id);
    // 解密 验证
    let valid = bcrypt.compareSync(oldPass, user.password);
    if (valid) {
      return {
        message: '与旧密码完全符合',
        statusCode: 200,
      };
    } else {
      return {
        message: '与旧密码不匹配',
        statusCode: 500,
      };
    }
  }
  // 更改密码
  @Post('/updatePass')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @ApiBody({
    description: '更改密码',
    type: volidatePass,
  })
  @ApiOkResponse({
    status: 200,
    description: '请求成功',
    type: SuccessResponse,
  })
  async updatePass(@Body() body: volidatePass) {
    const { pass } = body;
    const bcryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(10)).toString();
    body = { ...body, pass: bcryptPass };
    await this.userService.updatePass(body.id, body.pass);
    return {
      success: '修改成功',
      statusCode: 200,
    };
  }

  @Get('/account/:account')
  @ApiParam({
    name: 'account',
    description: '请输入账号',
  })
  @ApiResponse({
    status: 200,
    description: '请求用户数据',
    type: ResponseData,
  })
  async findAccount(@Param('account') account: string) {
    const user = await this.userService.findAccount(account);
    if (user) {
      return {
        statusCode: 200,
        data: user,
        message: '查询成功',
      };
    } else {
      return {
        statusCode: 500,
        message: '没有此用户',
      };
    }
  }
}
