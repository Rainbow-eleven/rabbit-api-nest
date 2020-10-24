import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EvaluateDetailDto } from './evaluate-detail.interface';
import { EvaluateDetailService } from './evaluate-detail.service';

@Controller('evaluate-detail')
@ApiTags('评估信息详情表')
export class EvaluateDetailController {
  constructor(private evadService: EvaluateDetailService) {}
  @Get()
  findAll() {
    return this.evadService.find();
  }

  @Post()
  create(@Body() body: EvaluateDetailDto) {
    return this.evadService.create(body);
  }
}
