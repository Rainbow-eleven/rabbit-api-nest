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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { MalfunctionDto } from './malfunction.interface';
import { MalfunctionService } from './malfunction.service';

@Controller('malfunction')
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
    description: '请输入商品ID',
    name: 'id',
  })
  async findOne(@Param('id') id: number) {
    return await this.malfunction.find(null, id);
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
    description: '请输入商品ID',
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
