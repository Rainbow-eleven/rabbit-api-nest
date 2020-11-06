import { EvaluateDto } from './entity.interface';
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
import { EvaluateService } from './evaluate.service';
import { ApiBearerAuth, ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponse, ErrorResponse } from 'src/service/interface';

@Controller('evaluate')
@ApiTags('评估信息')
@UseGuards(AuthGuard('jwt'))
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
@ApiBearerAuth()
export class EvaluateController {
  constructor(private service: EvaluateService) {}
  @Get()
  findAll() {
    return this.service.find();
  }

  @Get('/:id')
  @ApiParam({
    description: '请输入评估信息ID',
    name: 'id',
  })
  findOne(@Param('id') id: number) {
    return this.service.find(id);
  }

  @Post()
  create(@Body() body: EvaluateDto) {
    return this.service.create(body);
  }

  @Put('/:id')
  @ApiParam({
    description: '请输入评估信息ID',
    name: 'id',
  })
  update(@Param('id') id: number, @Body() body: EvaluateDto) {
    return this.service.update(id, body);
  }

  @Delete('/:id')
  @ApiParam({
    description: '请输入评估信息ID',
    name: 'id',
  })
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
