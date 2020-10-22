import { JwtStrategy } from '../../service/jwt.strategy';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    JwtModule.register({
      //生成token的key
      secret: 'muddyrain',
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        //token的有效时长
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([Users]),
    UserModule,
  ],
  providers: [LoginService, JwtStrategy, UserService],
  controllers: [LoginController],
})
export class LoginModule {}
