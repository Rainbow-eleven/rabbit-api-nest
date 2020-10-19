import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { responseMsg } from 'src/service/interface';
import { Brand } from './brand.entity';
import { BrandDto } from './brand.interface';
import { BrandService } from './brand.service';

@Controller('brand')
@ApiTags("品牌")
export class BrandController {
  constructor(private brand: BrandService) { }
  @Get()
  async find(): Promise<responseMsg<Brand, BrandDto> | Brand[]> {
    const data = await this.brand.find();
    return data
  }
  @Get("/:id")
  @ApiParam({
    name: "id",
    description: "请输入品牌ID值",
  })
  async findOne(@Param('id') id: number): Promise<responseMsg<Brand, BrandDto>> {
    return await this.brand.find(id);
  }

  @Post()
  async create(@Body() body: BrandDto): Promise<responseMsg<Brand, BrandDto>> {
    return await this.brand.create(body)
  }

  @Put("/:id")
  @ApiParam({
    name: "id",
    description: "请输入品牌ID值",
  })
  async update(@Body() body: BrandDto, @Param('id') id: number): Promise<responseMsg<Brand, BrandDto>> {
    return this.brand.update(id, body)
  }

  @Delete("/:id")
  @ApiParam({
    name: "id",
    description: "请输入品牌ID值",
  })
  async delete(@Param('id') id: number): Promise<responseMsg<Brand, BrandDto>> {
    return this.brand.delete(id)
  }
}
