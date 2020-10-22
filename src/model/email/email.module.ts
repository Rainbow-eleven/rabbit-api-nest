import { JwtStrategy } from './../login/jwt.strategy';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService,JwtStrategy]
})
export class EmailModule {}
