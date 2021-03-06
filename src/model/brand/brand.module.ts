import { JwtStrategy } from '../../service/jwt.strategy';
import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService,JwtStrategy],
  controllers: [BrandController]
})
export class BrandModule { }
