import { JwtStrategy } from './../../service/jwt.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from './model.controller';
import { Model } from './model.entity';
import { ModelService } from './model.service';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  controllers: [ModelController],
  providers: [ModelService, JwtStrategy],
})
export class ModelModule {}
