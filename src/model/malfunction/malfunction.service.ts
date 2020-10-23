import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responseMsg } from 'src/service/interface';
import { Isearch } from 'src/service/search';
import { Repository } from 'typeorm';
import { MalfunctionDto } from './malfunction.interface';
import { Malfunction } from './malfunction.entity';
@Injectable()
export class MalfunctionService {
  constructor(
    @InjectRepository(Malfunction) private malfunction: Repository<Malfunction>,
  ) {}
  async find(
    search?: Isearch,
    id?: number,
  ): Promise<responseMsg<Malfunction, MalfunctionDto>> {
    if (!id) {
      const data = await this.malfunction
        .query(`SELECT m.*, a.id AS 'modelId', a.modelName, a.faceImg FROM model AS a,
    malfunction AS m WHERE a.id = m.modelIdId `);
      return {
        message: '查询成功',
        statusCode: 200,
        data,
      };
    } else {
      let model = await this.malfunction.query(
        `select * from model where id = ${id}`,
      );
      const data = await this.malfunction
        .query(`SELECT m.* FROM model AS a, malfunction AS m
        WHERE a.id = m.modelIdId and m.modelIdId = ${id}`);
      model = { ...model[0], malfunctions: data };
      return {
        message: '查询成功',
        statusCode: 200,
        data: model,
      };
    }
  }

  async create(
    body: MalfunctionDto,
  ): Promise<responseMsg<Malfunction, MalfunctionDto>> {
    const malFucntion = await this.malfunction.query(
      `select * from malfunction where title = '${body.title}' and modelIdId = ${body.modelId}`,
    );
    if (!malFucntion[0]) {
      const MalfunctionRepository = await this.malfunction.create(body);
      this.malfunction.save(MalfunctionRepository);
      return {
        message: '创建成功',
        statusCode: 200,
      };
    } else {
      return {
        message: '故障名称已存在',
        statusCode: 500,
      };
    }
  }

  async update(
    id: number,
    body: MalfunctionDto,
  ): Promise<responseMsg<Malfunction, MalfunctionDto>> {
    const malFucntion = await this.malfunction.query(
      `select * from malfunction where title = '${body.title}'`,
    );
    if (!malFucntion[0]) {
      await this.malfunction.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
      };
    } else {
      return {
        message: '故障名称已存在',
        statusCode: 500,
      };
    }
  }

  async delete(id: number): Promise<responseMsg<Malfunction, MalfunctionDto>> {
    await this.malfunction.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
