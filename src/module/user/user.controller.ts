/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserDto } from './user.interface';
import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get()
  findAll() {
    return this.userService.findAll()
  }
  @Post()
  create(@Body() user: UserDto): any {
    console.log(user)
    this.userService.createOne(user)
    return user
  }
}
