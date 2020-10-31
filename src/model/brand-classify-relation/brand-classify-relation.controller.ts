import { Classify } from './../classify/classify.entity';
import { BrandClassifyRelationDto } from './brand-classify-relation.interface';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthResponse, ErrorResponse, responseMsg } from 'src/service/interface';
import { BrandClassifyRelation } from './brand-classify-relation.entity';
import { BrandClassifyRelationService } from './brand-classify-relation.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bcr')
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
@ApiTags('品牌类型关系')
export class BrandClassifyRelationController {
  constructor(private service: BrandClassifyRelationService) {}
  @Get()
  async find(): Promise<
    | responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>
    | BrandClassifyRelation[]
  > {
    const data = await this.service.find();
    return data;
  }
  
  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入品牌类型关联ID值',
  })
  async findOne(
    @Param('id') id: number,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    return await this.service.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() body: BrandClassifyRelationDto,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    return await this.service.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入品牌类型关联ID值',
  })
  async update(
    @Body() body: BrandClassifyRelationDto,
    @Param('id') id: number,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    return this.service.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入品牌类型关联ID值',
  })
  async delete(
    @Param('id') id: number,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    return this.service.delete(id);
  }
}
