import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluateDetail } from './evaluate-detail.entity';
import { EvaluateDetailDto } from './evaluate-detail.interface';

@Injectable()
export class EvaluateDetailService {
  constructor(
    @InjectRepository(EvaluateDetail)
    private readonly evad: Repository<EvaluateDetail>,
  ) {}
  async find(id?: number) {
    if (!id) {
      const data: EvaluateDetail[] = await this.evad.query(`
        SELECT
            *
          FROM
            evaluate_detail 
        `);
      for (let i = 0; i < data.length; i++) {
        let evaluate = await this.evad.query(`
          SELECT
            e.*
          FROM
            evaluate_detail AS ed,
            evaluate AS e
          WHERE
            ed.evaluateId = e.id
          And 
            e.id = ${data[i].evaluateId}
          `);
        let malfunction = await this.evad.query(`
          SELECT
            e.*
          FROM
            evaluate_detail AS ed,
            malfunction AS e
          WHERE
            ed.malfId = e.id
          And 
            e.id = ${data[i].malfId}
          `);
        let option = await this.evad.query(`
          SELECT
            e.*
          FROM
            evaluate_detail AS ed,
            malfunction_options AS e
          WHERE
            ed.optionId = e.id
          And 
            e.id = ${data[i].optionId}
          `);
        data[i] = {
          ...data[i],
          evaluateId: evaluate[0],
          malfId: malfunction[0],
          optionId: option[0],
        };
      }
      return {
        message: '查询成功',
        statusCode: 200,
        data: data,
      };
    } else {
      const data = await this.evad.query(`
      SELECT
        ed.*
      FROM
        evaluate_detail AS ed,
        evaluate AS e
      WHERE
        ed.evaluateId = e.id
      AND 
        e.id = ${id}
      And
        ed.id = ${id}
      `);
      let evaluate = await this.evad.query(`
      SELECT
        e.*
      FROM
        evaluate_detail AS ed,
        evaluate AS e
      WHERE
        ed.evaluateId = e.id
      And 
        e.id = ${data[0].evaluateId}
      And
        ed.id = ${id}
      `);
      let malfunction = await this.evad.query(`
      SELECT
        e.*
      FROM
        evaluate_detail AS ed,
        malfunction AS e
      WHERE
        ed.malfId = e.id
      And 
        e.id = ${data[0].malfId}
      And
        ed.id = ${id}
      `);
      let option = await this.evad.query(`
      SELECT
        e.*
      FROM
        evaluate_detail AS ed,
        malfunction_options AS e
      WHERE
        ed.optionId = e.id
      And 
        e.id = ${data[0].optionId}
      And
        ed.id = ${id}
      `);
      data[0] = {
        ...data[0],
        evaluateId: evaluate[0],
        malfId: malfunction[0],
        optionId: option[0],
      };
      return {
        message: '查询成功',
        statusCode: 200,
        data: data[0],
      };
    }
  }
  async create(body: EvaluateDetailDto) {
    const { evaluateId } = body;
    const isSame = await this.evad.findOne({
      where: { evaluateId },
    });
    if (isSame) {
      return {
        message: '故障ID不能重复使用',
        statusCode: 500,
      };
    } else {
      const evaluate = await this.evad.create(body);
      await this.evad.save(evaluate);
      return {
        message: '创建成功',
        statusCode: 200,
      };
    }
  }
  async delete(id: number) {
    await this.evad.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
