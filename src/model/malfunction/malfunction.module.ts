import { JwtStrategy } from './../../service/jwt.strategy';
import { Malfunction } from './malfunction.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MalfunctionController } from './malfunction.controller';
import { MalfunctionService } from './malfunction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Malfunction])],
  controllers: [MalfunctionController],
  providers: [MalfunctionService,JwtStrategy],
})
export class MalfunctionModule {}
