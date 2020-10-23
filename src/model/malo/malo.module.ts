import { JwtStrategy } from './../../service/jwt.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaloController } from './malo.controller';
import { Malfunction_options } from './malo.entity';
import { MaloService } from './malo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Malfunction_options])],
  controllers: [MaloController],
  providers: [MaloService, JwtStrategy],
})
export class MaloModule {}
