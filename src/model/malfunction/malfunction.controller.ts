import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MalfunctionDto } from './malfunction.interface';
import { MalfunctionService } from './malfunction.service';

@Controller('malfunction')
@ApiTags('故障表')
export class MalfunctionController {
  constructor(private malfunction: MalfunctionService) {}
  @Get()
  async find() {
    return await this.malfunction.find();
  }

  @Get('/:id')
  @ApiParam({
    description: '请输入商品ID',
    name: 'id',
  })
  async findOne(@Param('id') id: number) {
    return await this.malfunction.find(null, id);
  }

  @Post()
  async create(@Body() body: MalfunctionDto) {
    return await this.malfunction.create(body);
  }

  @Put('/:id')
  @ApiParam({
    description: '请输入商品ID',
    name: 'id',
  })
  async update(@Param('id') id: number, @Body() body: MalfunctionDto) {
    return await this.malfunction.update(id, body);
  }

  @Delete('/:id')
  @ApiParam({
    description: '请输入商品ID',
    name: 'id',
  })
  async delete(@Param('id') id: number) {
    return await this.malfunction.delete(id);
  }
}
