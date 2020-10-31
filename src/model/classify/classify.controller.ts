import { AuthGuard } from '@nestjs/passport';
import { ClassifyService } from './classify.service';
import {
  ClassifyDto,
  ResponseAllClassifys,
  ResponseClassifyOne,
} from './classity.interface';
import { Classify } from './classify.entity';
import {
  AuthResponse,
  ErrorResponse,
  responseMsg,
  SuccessResponse,
} from './../../service/interface';
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
import {
  ApiParam,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiBadGatewayResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('classify')
@ApiTags('商品分类')
@ApiResponse({
  status: 401,
  description: '没有身份,请重新登陆',
  type: AuthResponse,
})
@ApiBadGatewayResponse({
  status: 500,
  description: '请求失败',
  type: ErrorResponse,
})
export class ClassifyController {
  constructor(private classify: ClassifyService) {}
  @Get()
  @ApiResponse({
    description: '请求成功',
    status: 200,
    type: ResponseAllClassifys,
  })
  async find(): Promise<responseMsg<Classify, ClassifyDto> | Classify[]> {
    const data = await this.classify.find();
    return data;
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入商品类型ID值',
  })
  @ApiResponse({
    description: '请求成功',
    status: 200,
    type: ResponseClassifyOne,
  })

  async findOne(
    @Param('id') id: number,
  ): Promise<responseMsg<Classify, ClassifyDto>> {
    return await this.classify.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({
    description: '请求成功',
    status: 200,
    type: SuccessResponse,
  })
  async create(
    @Body() body: ClassifyDto,
  ): Promise<responseMsg<Classify, ClassifyDto>> {
    return await this.classify.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入商品类型ID值',
  })
  @ApiOkResponse({
    description: '请求成功',
    status: 200,
    type: SuccessResponse,
  })
  async update(
    @Body() body: ClassifyDto,
    @Param('id') id: number,
  ): Promise<responseMsg<Classify, ClassifyDto>> {
    return this.classify.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiParam({
    name: 'id',
    description: '请输入商品类型ID值',
  })
  @ApiOkResponse({
    description: '请求成功',
    status: 200,
    type: SuccessResponse,
  })
  async delete(
    @Param('id') id: number,
  ): Promise<responseMsg<Classify, ClassifyDto>> {
    return this.classify.delete(id);
  }
}
