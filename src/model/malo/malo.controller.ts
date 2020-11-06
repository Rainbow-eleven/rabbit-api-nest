import { MaloService } from './malo.service';
import { MaloDto } from './malo.interface';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponse, ErrorResponse } from 'src/service/interface';

@Controller('malo')
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
@ApiTags('故障选项字典表')
export class MaloController {
  constructor(private maloService: MaloService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async findAll() {
    return await this.maloService.find();
  }

  @Get('/:id')
  @ApiParam({
    description: '请输入故障信息ID',
    name: 'id',
  })
  async findOne(@Param('id') id: number) {
    return await this.maloService.find(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入故障信息ID',
    name: 'id',
  })
  async create(@Body() body: MaloDto) {
    return await this.maloService.create(body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入故障信息ID',
    name: 'id',
  })
  async update(@Param('id') id: number, @Body() body: MaloDto) {
    return await this.maloService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入故障信息ID',
    name: 'id',
  })
  async delete(@Param('id') id: number) {
    return await this.maloService.delete(id);
  }
}
