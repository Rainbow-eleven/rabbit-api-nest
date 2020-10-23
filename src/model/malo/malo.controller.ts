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
import { ApiTags, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('malo')
@ApiTags('故障选项字典表')
export class MaloController {
  constructor(private maloService: MaloService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiQuery({
    description: '模型Id',
    name: 'mid',
    required: false,
  })
  @ApiQuery({
    description: '故障Id',
    name: 'maid',
    required: false,
  })
  async findAll(@Query('mid') mid: number, @Query('mid') maid: number) {
    return await this.maloService.find(mid, maid);
  }

  // @Get('/:id')
  // @ApiParam({
  //   description: '请输入故障信息ID',
  //   name: 'id',
  // })
  // async findOne(@Param('id') id: number) {
  //   return await this.maloService.find(id);
  // }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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
