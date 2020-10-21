import { JwtStrategy } from '../login/jwt.strategy';
import { Classify } from './classify.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassifyController } from './classify.controller';
import { ClassifyService } from './classify.service';

@Module({
  imports: [TypeOrmModule.forFeature([Classify])],
  controllers: [ClassifyController],
  providers: [ClassifyService, JwtStrategy],
})
export class ClassifyModule {}
