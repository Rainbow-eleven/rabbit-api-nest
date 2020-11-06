import { Appointment } from './model/appointment/appointment.entity';
import { Evaluate } from './model/evaluate/evaluate.entity';
import { JwtStrategy } from './service/jwt.strategy';
import { join } from 'path';
import { Classify } from './model/classify/classify.entity';
import { Users } from './model/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './model/user/user.module';
import { ClassifyModule } from './model/classify/classify.module';
import { BrandModule } from './model/brand/brand.module';
import { Brand } from './model/brand/brand.entity';
import { LoginModule } from './model/login/login.module';
import { EmailModule } from './model/email/email.module';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import { ModelModule } from './model/model/model.module';
import { Model } from './model/model/model.entity';
import { MalfunctionModule } from './model/malfunction/malfunction.module';
import { Malfunction } from './model/malfunction/malfunction.entity';
import { MaloModule } from './model/malo/malo.module';
import { Malfunction_options } from './model/malo/malo.entity';
import { ToolController } from './tool.controller';
import { OSSModule } from '@nest-public/nest-oss';
import { EvaluateModule } from './model/evaluate/evaluate.module';
import { EvaluateDetail } from './model/evaluate-detail/evaluate-detail.entity';
import { AppointmentModule } from './model/appointment/appointment.module';
import { ToolService } from './tool.service';
import { EvaluateDetailModule } from './model/evaluate-detail/evaluate-detail.module';

const emailConfig = {
  useFactory: () => ({
    transport: 'smtps://aimmeng@163.com:OWRZKAPNBPKZSTEX@smtp.163.com',
    defaults: {
      from: '"nest-modules" <modules@nestjs.com>',
    },
    template: {
      dir: join(__dirname, '../src/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
    options: {},
  }),
};
const ossConfig = {
  client: {
    endpoint: 'oss-cn-beijing.aliyuncs.com', // endpoint域名
    accessKeyId: 'LTAI4G79gBgCCdgan6uVZjSY', // 账号
    accessKeySecret: 'f2VHOxDAQwHE0ajH9syiKAnO3e1pYn', // 密码
    bucket: 'czh1010', // 存储桶
    internal: false, // 是否使用阿里云内部网访问
    secure: true, // 使用 HTTPS
    cname: false, // 自定义endpoint
    timeout: '90s',
  },
  domain: '', // 自定义域名})],
};
@Module({
  imports: [
    TypeOrmModule.forFeature([Model]),
    OSSModule.forRoot(ossConfig),
    MailerModule.forRootAsync(emailConfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: '127.0.0.1',
      username: 'root',
      password: '123456',
      database: 'rabbit',
      synchronize: true,
      entities: [
        Users,
        Classify,
        Brand,
        Model,
        Malfunction,
        Malfunction_options,
        Evaluate,
        // EvaluateDetail,
        Appointment,
      ],
    }),
    LoginModule,
    EmailModule,
    UserModule,
    ClassifyModule,
    BrandModule,
    ModelModule,
    MalfunctionModule,
    MaloModule,
    EvaluateModule,
    // EvaluateDetailModule,
    AppointmentModule,
  ],
  controllers: [ToolController],
  providers: [JwtStrategy, ToolService],
})
export class AppModule {}
