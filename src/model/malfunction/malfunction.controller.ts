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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthResponse, ErrorResponse } from 'src/service/interface';
import { MalfunctionDto } from './malfunction.interface';
import { MalfunctionService } from './malfunction.service';

@Controller('malfunction')
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
@ApiTags('故障表')
export class MalfunctionController {
  constructor(private malfunction: MalfunctionService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async find() {
    return await this.malfunction.find();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入故障ID',
    name: 'id',
  })
  async findOne(@Param('id') id: number) {
    return await this.malfunction.find(null, id);
  }

  @Get('/model/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入商品ID',
    name: 'id',
  })
  async findModel(@Param('id') id: number) {
    return await this.malfunction.findModel(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async create(@Body() body: MalfunctionDto) {
    return await this.malfunction.create(body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入选项ID',
    name: 'id',
  })
  async update(@Param('id') id: number, @Body() body: MalfunctionDto) {
    return await this.malfunction.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入商品ID',
    name: 'id',
  })
  async delete(@Param('id') id: number) {
    return await this.malfunction.delete(id);
  }
}
