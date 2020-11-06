import { AppointmentDto } from './appointment.interface';
import { Appointment } from './appointment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointment: Repository<Appointment>,
  ) {}
  async find(id?) {
    if (id) {
      let user = await this.appointment.query(`
      SELECT
        u.*
      FROM
        users AS u
      WHERE
        id = ${id}
      `);
      const data = await this.appointment.query(`
      SELECT
        a.*
      FROM
        appointment AS a,
        users AS u
      WHERE
        a.userId = u.id
      AND u.id = ${id}
      `);
      user = { ...user[0], appointments: data };
      return {
        message: '查询成功',
        statusCode: 200,
        data: user,
      };
    } else {
      const data = await this.appointment.query(`
      SELECT
        u.id AS "userId",
        u.username,
        u.faceUrl as "userImg",
        a.*
      FROM
        users AS u,
        appointment AS a
      WHERE
        a.userId = u.id
      `);
      return {
        message: '查询成功',
        statusCode: 200,
        data,
      };
    }
  }
  async create(body: AppointmentDto) {
    await this.appointment.save(await this.appointment.create(body));
    return {
      message: '创建成功',
      statusCode: 200,
    };
  }
  async update(id: number, body: AppointmentDto) {
    await this.appointment.update(id, body);
    return {
      message: '更新成功',
      statusCode: 200,
    };
  }
  async delete(id: number) {
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
