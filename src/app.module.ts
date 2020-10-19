import { Classify } from './model/classify/classify.entity';
import { User } from './model/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from './model/user/user.module';
import { ClassifyModule } from './model/classify/classify.module';
import { BrandModule } from './model/brand/brand.module';
import { Brand } from './model/brand/brand.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    port: 3306,
    host: "localhost",
    username: "root",
    password: "123456",
    database: "rabbit",
    synchronize: true,
    entities: [User, Classify, Brand],
  }), UserModule, ClassifyModule, BrandModule]
})
export class AppModule { }
