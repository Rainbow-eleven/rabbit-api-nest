import { Classify } from './model/classify/classify.entity';
import { Users } from './model/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './model/user/user.module';
import { ClassifyModule } from './model/classify/classify.module';
import { BrandModule } from './model/brand/brand.module';
import { Brand } from './model/brand/brand.entity';
import { BrandClassifyRelationModule } from './model/brand-classify-relation/brand-classify-relation.module';
import { BrandClassifyRelation } from './model/brand-classify-relation/brand-classify-relation.entity';
import { LoginModule } from './model/login/login.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: '127.0.0.1',
      username: 'root',
      password: '123456',
      database: 'rabbit',
      synchronize: true,
      entities: [Users, Classify, Brand, BrandClassifyRelation],
    }),
    LoginModule,
    UserModule,
    ClassifyModule,
    BrandModule,
    BrandClassifyRelationModule,
  ],
})
export class AppModule {}
