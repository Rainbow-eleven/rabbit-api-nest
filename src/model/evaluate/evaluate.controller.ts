import { EvaluateDto } from './entity.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('evaluate')
@ApiTags('评估信息')
export class EvaluateController {
  constructor(private service: EvaluateService) {}
  @Get()
  findAll() {
    return this.service.find();
  }

  @Get('/:id')
  @ApiParam({
    description: '请输入商品模型ID',
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
