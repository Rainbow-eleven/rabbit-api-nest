import { JwtStrategy } from './../../service/jwt.strategy';
import { Evaluate } from './evaluate.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluateController } from './evaluate.controller';
import { EvaluateService } from './evaluate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluate])],
  controllers: [EvaluateController],
  providers: [EvaluateService, JwtStrategy],
})
export class EvaluateModule {}
