import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthResponse, ErrorResponse } from 'src/service/interface';
import { EvaluateDetailDto } from './evaluate-detail.interface';
import { EvaluateDetailService } from './evaluate-detail.service';

@Controller('evaluate-detail')
@ApiTags('评估信息详情表')
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
export class EvaluateDetailController {
  constructor(private evadService: EvaluateDetailService) {}
  @Get()
  findAll() {
    return this.evadService.find();
  }

  @Post()
  create(@Body() body: EvaluateDetailDto) {
    return this.evadService.create(body);
  }

  @Get('/:id')
  @ApiParam({
    description: '输入评估详情Id',
    name: 'id',
  })
  async findOne(@Param('id') id: number) {
    return await this.evadService.find(id);
  }

  @Delete('/:id')
  @ApiParam({
    description: '输入评估详情Id',
    name: 'id',
  })
  delete(@Param('id') id: number) {
    return this.evadService.delete(id);
  }
}
