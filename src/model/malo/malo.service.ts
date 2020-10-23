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
  async find(
    mid?: number,
    maid?: number,
  ): Promise<responseMsg<Malfunction_options, MaloDto>> {
    if (mid && maid) {
      let model = await this.malo.query(
        `select * from model where id = ${mid}`,
      );
      const maData = await this.malo.query(`
      select * from malfunction where id = ${maid}
    `);
      const moData = await this.malo.query(`
      SELECT
        mao.*
      FROM
        malfunction_options AS mao,
        malfunction AS ma,
        model AS model
      WHERE
        model.id = mao.modelIdId
      AND ma.id = mao.malfIdId
      AND mao.modelIdId = ${mid}
      AND mao.malfIdId = ${maid}
    `);
      model = {
        ...model[0],
        malfunctions: {
          ...maData[0],
          specification: [],
          malfunction_options: moData,
        },
      };
      return {
        message: '查询成功',
        statusCode: 200,
        data: model,
      };
    } else {
      let model = await this.malo.query(
        `select * from model where id = ${mid}`,
      );
      const moData = await this.malo.query(`
      SELECT
        ma.*
      FROM
        malfunction AS ma,
        model AS mo
      WHERE
        mo.id = ma.modelIdId
      AND mo.id = ${mid}
      `);
      model = { ...model[0], malfunctions: moData };
      return {
        message: '查询成功',
        statusCode: 200,
        data: model,
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
    const malFucntion = await this.malo.query(
      `select * from malfunction_options where title = '${body.optionName}'`,
    );
    if (!malFucntion[0]) {
      await this.malo.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
      };
    } else {
      return {
        message: '故障选项已存在',
        statusCode: 500,
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
