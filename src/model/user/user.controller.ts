import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { responseMsg } from './../../service/interface';
import { Users } from './user.entity';
import { ApiParam, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserDto } from './user.interface';
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
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('用户')
export class UserController {
  constructor(private userService: UserService) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('/')
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
  @ApiParam({
    name: 'id',
    description: '输入用户ID值',
  })
  findOne(@Param('id') id: number) {
    return this.userService.find(null, id);
  }

  @Post()
  async create(@Body() user: UserDto): Promise<responseMsg<Users, UserDto>> {
    const { password } = user;
    const bcryptPass = bcrypt
      .hashSync(password, bcrypt.genSaltSync(10))
      .toString();
    user = { ...user, password: bcryptPass };
    const res = await this.userService.createOne(user);
    return res;
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    description: '输入用户ID值',
  })
  async update(
    @Param('id') id: number,
    @Body() user: UserDto,
  ): Promise<responseMsg<Users, UserDto>> {
    const { password } = user;
    const bcryptPass = bcrypt
      .hashSync(password, bcrypt.genSaltSync(10))
      .toString();
    user = { ...user, password: bcryptPass };
    const res = await this.userService.update(id, user);
    return res;
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    description: '输入用户ID值',
  })
  async delete(@Param('id') id: number): Promise<responseMsg<Users, UserDto>> {
    const res = await this.userService.deleteOne(id);
    return res;
  }

  // 校验旧密码
  @Post('volidateOldPass')
  @ApiBody({
    description: '校验旧密码',
    type: volidatePass,
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
  @ApiBody({
    description: '更改密码',
    type: volidatePass,
  })
  async updatePass(@Body() body: volidatePass) {
    const { pass } = body;
    const bcryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(10)).toString();
    body = { ...body, pass: bcryptPass };
    await this.userService.updatePass(body.id, body.pass);
    return {
      success: '修改成功',
    };
  }
}
