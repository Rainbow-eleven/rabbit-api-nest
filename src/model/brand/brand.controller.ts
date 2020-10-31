import {
  AuthResponse,
  ErrorResponse,
  SuccessResponse,
} from './../../service/interface';
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
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { responseMsg } from 'src/service/interface';
import { Brand } from './brand.entity';
import { BrandDto, ResponseAllBrands, ResponseBrand } from './brand.interface';
import { BrandService } from './brand.service';

@Controller('brand')
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
@ApiTags('品牌')
export class BrandController {
  constructor(private brand: BrandService) {}
  @Get()
  @ApiResponse({
    type: ResponseAllBrands,
    description: '查询全部品牌',
    status: 200,
  })
  async find(): Promise<responseMsg<Brand, BrandDto> | Brand[]> {
    const data = await this.brand.find();
    return data;
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入品牌ID值',
  })
  @ApiResponse({
    description: '请求成功',
    type: ResponseBrand,
    status: 200,
  })
  async findOne(
    @Param('id') id: number,
  ): Promise<responseMsg<Brand, BrandDto>> {
    return await this.brand.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiResponse({
    description: '请求成功',
    type: SuccessResponse,
    status: 200,
  })
  async create(@Body() body: BrandDto): Promise<responseMsg<Brand, BrandDto>> {
    return await this.brand.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入品牌ID值',
  })
  @ApiResponse({
    description: '请求成功',
    type: SuccessResponse,
    status: 200,
  })
  async update(
    @Body() body: BrandDto,
    @Param('id') id: number,
  ): Promise<responseMsg<Brand, BrandDto>> {
    return this.brand.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiResponse({
    description: '请求成功',
    type: SuccessResponse,
    status: 200,
  })
  @ApiParam({
    name: 'id',
    description: '请输入品牌ID值',
  })
  async delete(@Param('id') id: number): Promise<responseMsg<Brand, BrandDto>> {
    return this.brand.delete(id);
  }
}
