import { ModelService } from './model.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModelDto } from './model.interface';
import { ApiTags, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Model } from './model.entity';
import { responseMsg } from 'src/service/interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('model')
@ApiTags('商品模型')
export class ModelController {
  constructor(private modelService: ModelService) {}
  @Get('/')
  @ApiQuery({
    name: 'keyword',
    description: '搜素关键字',
    required: false,
    type: String,
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
    const data:
      | Model[]
      | Model
      | responseMsg<Model, ModelDto> = await this.modelService.find({
      keyword,
      count,
      pageSize,
    });
    if (data instanceof Array) {
      return {
        data,
        total: (await data).length,
      };
    } else {
      return data;
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入品牌id',
    name: 'id',
  })
  async findOne(@Param('id') id: number) {
    return this.modelService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  create(@Body() body: ModelDto) {
    return this.modelService.create(body);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入模型id',
    name: 'id',
  })
  update(@Param('id') id: number, @Body() body: ModelDto) {
    return this.modelService.update(id, body);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({
    description: '请输入模型id',
    name: 'id',
  })
  delete(@Param('id') id: number) {
    return this.modelService.delete(id);
  }
}
