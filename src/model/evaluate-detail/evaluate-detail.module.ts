import { JwtStrategy } from './../../service/jwt.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluateDetailController } from './evaluate-detail.controller';
import { EvaluateDetail } from './evaluate-detail.entity';
import { EvaluateDetailService } from './evaluate-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluateDetail])],
  controllers: [EvaluateDetailController],
  providers: [EvaluateDetailService, JwtStrategy],
})
export class EvaluateDetailModule {}
