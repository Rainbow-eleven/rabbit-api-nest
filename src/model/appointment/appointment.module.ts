import { JwtStrategy } from './../../service/jwt.strategy';
import { Appointment } from './appointment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService, JwtStrategy],
})
export class AppointmentModule {}
