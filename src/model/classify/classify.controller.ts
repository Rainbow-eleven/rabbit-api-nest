import { ClassifyService } from './classify.service';
import { ClassifyDto } from './classity.interface';
import { Classify } from './classify.eneity';
import { responseMsg } from './../../service/interface';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@Controller('classify')
@ApiTags("商品分类")
export class ClassifyController {
  constructor(private classify: ClassifyService) { }
  @Get()
  async find(): Promise<responseMsg<Classify, ClassifyDto> | Classify[]> {
    const data = await this.classify.find();
    return data
  }
  @Get("/:id")
  @ApiParam({
    name: "id",
    description: "请输入商品类型ID值",
  })
  async findOne(@Param('id') id: number): Promise<responseMsg<Classify, ClassifyDto>> {
    return await this.classify.find(id);
  }

  @Post()
  async create(@Body() body: ClassifyDto): Promise<responseMsg<Classify, ClassifyDto>> {
    return await this.classify.create(body)
  }

  @Put("/:id")
  @ApiParam({
    name: "id",
    description: "请输入商品类型ID值",
  })
  async update(@Body() body: ClassifyDto, @Param('id') id: number): Promise<responseMsg<Classify, ClassifyDto>> {
    return this.classify.update(id, body)
  }

  @Delete("/:id")
  @ApiParam({
    name: "id",
    description: "请输入商品类型ID值",
  })
  async delete(@Param('id') id: number): Promise<responseMsg<Classify, ClassifyDto>> {
    return this.classify.delete(id)
  }
}
