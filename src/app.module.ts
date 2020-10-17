import { User } from './module/user/user.eneity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from './module/user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    port: 3306,
    host: "localhost",
    username: "root",
    password: "123456",
    database: "rabbit",
    synchronize: true,
    entities: [User],
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
