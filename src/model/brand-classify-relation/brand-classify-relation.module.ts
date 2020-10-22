import { JwtStrategy } from '../../service/jwt.strategy';
import { Module } from '@nestjs/common';
import { BrandClassifyRelationService } from './brand-classify-relation.service';
import { BrandClassifyRelationController } from './brand-classify-relation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandClassifyRelation } from './brand-classify-relation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BrandClassifyRelation])],
  providers: [BrandClassifyRelationService,JwtStrategy],
  controllers: [BrandClassifyRelationController],
})
export class BrandClassifyRelationModule {}
