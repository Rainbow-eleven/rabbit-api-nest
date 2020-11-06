import { MaloDto } from './malo.interface';
import { responseMsg } from './../../service/interface';
import { Malfunction_options } from './malo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MaloService {
  constructor(
    @InjectRepository(Malfunction_options)
    private malo: Repository<Malfunction_options>,
  ) {}
  async find(id?: number): Promise<responseMsg<Malfunction_options, MaloDto>> {
    if (!id) {
      let malos = await this.malo.query(`select * from malfunction_options`);
      for (let i = 0; i < malos.length; i++) {
        let model = await this.malo.query(
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
          malfunction_options AS malo
        WHERE
          m.id = malo.modelId
        AND
        malo.modelId = ${malos[i].modelId}`,
        );
        malos[i] = { ...malos[i], modelId: model[0] };
      }
      for (let i = 0; i < malos.length; i++) {
        let malfunction = await this.malo.query(
          `SELECT
          ma.*
        FROM
          malfunction AS ma,
          malfunction_options AS malo
        WHERE
          ma.id = malo.malfunctionId
        AND malo.malfunctionId = ${malos[i].malfunctionId}`,
        );
        malos[i] = { ...malos[i], malfunctionId: malfunction[0] };
      }
      return {
        message: '查询成功',
        statusCode: 200,
        data: malos,
      };
    } else {
      const malo = await this.malo.query(
        `select * from malfunction_options where id  = ${id}`,
      );
      return {
        message: '查询成功',
        statusCode: 200,
        data: malo[0],
      };
    }
  }

  async create(
    body: MaloDto,
  ): Promise<responseMsg<Malfunction_options, MaloDto>> {
    const MalfunctionRepository = this.malo.create(body);
    this.malo.save(MalfunctionRepository);
    return {
      message: '创建成功',
      statusCode: 200,
    };
  }

  async update(
    id: number,
    body: MaloDto,
  ): Promise<responseMsg<Malfunction_options, MaloDto>> {
    const isUsers = await this.malo.query(`
    Select * from malfunction_options where optionName = '${body.optionName}'
  `);
    if (isUsers[0]) {
      if (id == isUsers[0].id) {
        await this.malo.update(id, body);
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
      await this.malo.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
      };
    }
  }

  async delete(id: number): Promise<responseMsg<Malfunction_options, MaloDto>> {
    await this.malo.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
