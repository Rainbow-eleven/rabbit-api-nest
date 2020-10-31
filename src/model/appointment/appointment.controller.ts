import { AppointmentService } from './appointment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppointmentDto } from './appointment.interface';
import { ApiBearerAuth, ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponse, ErrorResponse } from 'src/service/interface';

@Controller('appointment')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('预约维修信息表')
@ApiResponse({
  status: 401,
  description: '没有身份,请重新登陆',
  type: AuthResponse,
})
@ApiResponse({
  description: '请求失败',
  status: 500,
  type: ErrorResponse,
})
export class AppointmentController {
  constructor(private service: AppointmentService) {}
  @Get()
  findAll() {
    return this.service.find();
  }

  @Get('/:id')
  @ApiParam({
    description: '请输入用户ID',
    name: 'id',
  })
  findOne(@Param('id') id: number) {
    return this.service.find(id);
  }

  @Post()
  create(@Body() body: AppointmentDto) {
    return this.service.create(body);
  }

  @Put('/:id')
  @ApiParam({
    description: '请输入预约ID',
    name: 'id',
  })
  update(@Param('id') id: number, @Body() body: AppointmentDto) {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  @ApiParam({
    description: '请输入预约ID',
    name: 'id',
  })
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
