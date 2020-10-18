import { Classify } from './model/classify/classify.eneity';
import { User } from './model/user/user.eneity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from './model/user/user.module';
import { ClassifyModule } from './model/classify/classify.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    port: 3306,
    host: "localhost",
    username: "root",
    password: "123456",
    database: "rabbit",
    synchronize: true,
    entities: [User, Classify],
  }), UserModule, ClassifyModule]
})
export class AppModule { }
