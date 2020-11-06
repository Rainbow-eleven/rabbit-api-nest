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
      const data: Malfunction[] = await this.malfunction.query(
        `select * from malfunction`,
      );
      for (var i = 0; i < data.length; i++) {
        let model = await this.malfunction.query(
          `SELECT
            m.id,
            m.modelName,
            M.faceImg,
            M.exchangePrice,
            M.topPrice,
            M.description,
            M.contentImg
          FROM
            model AS m,
            malfunction AS ma
          WHERE
            m.id = ma.modelId
          AND
            ma.modelId = ${data[i].modelId}`,
        );
        data[i] = { ...data[i], modelId: model[0] };
      }
      return {
        message: '查询成功',
        statusCode: 200,
        data,
      };
    } else {
      const data = await this.malfunction.query(
        `
          select * from malfunction where id = ${id}
        `,
      );
      return {
        message: '查询成功',
        statusCode: 200,
        data: data[0],
      };
    }
  }
  async findModel(id: number) {
    let model = await this.malfunction.query(
      `select * from model where id = ${id}`,
    );
    const data = await this.malfunction.query(`
      SELECT
        ma.*
      FROM
        model AS m,
        malfunction AS ma
      WHERE
        m.id = ma.modelId
      AND
        ma.modelId = ${id}
      `);
    model = { ...model[0], malfunctions: data };
    return {
      message: '查询成功',
      statusCode: 200,
      data: model,
    };
  }
  async create(
    body: MalfunctionDto,
  ): Promise<responseMsg<Malfunction, MalfunctionDto>> {
    const malFucntion = await this.malfunction.query(
      `select * from malfunction where title = '${body.title}' and modelId = ${body.modelId}`,
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
    const isUsers = await this.malfunction.query(`
      Select * from malfunction where title = '${body.title}'
    `);
    if (isUsers[0]) {
      if (id == isUsers[0].id) {
        await this.malfunction.update(id, body);
        return {
          message: '更新成功',
          statusCode: 200,
        };
      } else {
        return {
          message: '该账户已经被注册',
          statusCode: 500,
        };
      }
    } else {
      await this.malfunction.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
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
