import { EvaluateDto } from './entity.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluate } from './evaluate.entity';

@Injectable()
export class EvaluateService {
  constructor(
    @InjectRepository(Evaluate) private readonly evaluate: Repository<Evaluate>,
  ) {}
  async find(id?: number) {
    if (!id) {
      const evaluates = await this.evaluate.query(`
         select * from evaluate
      `);
      for (let i = 0; i < evaluates.length; i++) {
        const model = await this.evaluate.query(`
          SELECT
            mo.*
            FROM
              evaluate AS eva,
              model AS mo
            WHERE
              eva.modelId = mo.id 
            And mo.id = ${evaluates[i].modelId}
        `);
        evaluates[i] = { ...evaluates[i], modelId: model[0] };
      }
      return {
        message: '查询成功',
        statusCode: 200,
        data: evaluates,
      };
    } else {
      const data = await this.evaluate.query(`
        select * from evaluate where id = ${id}
      `);
      return {
        message: '查询成功',
        statusCode: 200,
        data: data[0],
      };
    }
  }
  async create(body: EvaluateDto) {
    const evaluate = await this.evaluate.create(body);
    await this.evaluate.save(evaluate);
    return {
      message: '创建成功',
      statusCode: 200,
    };
  }
  async update(id: number, body: EvaluateDto) {
    await this.evaluate.update(id, body);
    return {
      message: '更新成功',
      statusCode: 200,
    };
  }
  async delete(id: number) {
    await this.evaluate.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
