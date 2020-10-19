import { responseMsg } from './../../service/interface';
import { User } from './user.entity';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserDto } from './user.interface';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
@Controller('user')
@ApiTags("用户")
export class UserController {
  constructor(private userService: UserService) { }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get("/")
  @ApiQuery({
    name: "keyword",
    description: "搜素关键字",
    required: false,
    type: String
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
    const data: User[] | User | responseMsg<User, UserDto> = await this.userService.find({ keyword, count, pageSize })
    if (data instanceof Array) {
      return {
        data,
        total: (await data).length
      }
    } else {
      return data
    }
  }
  @Get("/:id")
  @ApiParam({
    name: "id",
    description: "输入用户ID值"
  })
  findOne(@Param("id") id: number) {
    return this.userService.find(null, id)
  }

  @Post()
  async create(@Body() user: UserDto): Promise<responseMsg<User, UserDto>> {
    const { password } = user;
    const bcryptPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10)).toString()
    user = { ...user, password: bcryptPass }
    const res = await this.userService.createOne(user)
    return res
  }

  @Put('/:id')
  @ApiParam({
    name: "id",
    description: "输入用户ID值"
  })
  async update(@Param('id') id: number, @Body() user: UserDto): Promise<responseMsg<User, UserDto>> {
    const res = await this.userService.update(id, user);
    return res
  }

  @Delete('/:id')
  @ApiParam({
    name: "id",
    description: "输入用户ID值"
  })
  async delete(@Param('id') id: number): Promise<responseMsg<User, UserDto>> {
    const res = await this.userService.deleteOne(id);
    return res
  }
}
