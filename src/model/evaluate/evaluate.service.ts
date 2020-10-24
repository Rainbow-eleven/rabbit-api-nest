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
      const data = await this.evaluate.query(`
    SELECT
      mo.id AS modelId,
      mo.modelName,
      mo.faceImg,
      eva.id AS evaId,
      eva.subscription,
      eva.price,
      eva.remark
    FROM
      evaluate AS eva,
      model AS mo
    WHERE
      eva.modelIdId = mo.id
    `);
      return {
        message: '查询成功',
        statusCode: 200,
        data,
      };
    } else {
      const data = await this.evaluate.query(`
    SELECT
      mo.id AS modelId,
      mo.modelName,
      mo.faceImg,
      eva.id AS evaId,
      eva.subscription,
      eva.price,
      eva.remark
    FROM
      evaluate AS eva,
      model AS mo
    WHERE
      eva.modelIdId = mo.id
    AND
	    mo.id = ${id}
    `);
      return {
        message: '查询成功',
        statusCode: 200,
        data:data[0],
      };
    }
  }
  async create(body: EvaluateDto) {
    const eva = await this.evaluate.query(`
      SELECT * FROM evaluate WHERE modelidid = ${body.modelId}
    `);
    if (!eva[0]) {
      const evaluate = await this.evaluate.create(body);
      await this.evaluate.save(evaluate);
      return {
        message: '创建成功',
        statusCode: 200,
      };
    } else {
      return {
        message: '商品模型ID已存在',
        statusCode: 500,
      };
    }
  }
  async update(id: number, body: EvaluateDto) {
    const eva = await this.evaluate.query(
      `select * from evaluate where modelidid = '${body.modelId}'`,
    );
    const idEva = await this.evaluate.find({ modelId: body.modelId, id });
    if (!eva[0]) {
      await this.evaluate.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
      };
    } else {
      if (idEva[0]) {
        await this.evaluate.update(id, body);
        return {
          message: '更新成功',
          statusCode: 200,
        };
      } else {
        return {
          message: '模型ID已存在',
          statusCode: 500,
        };
      }
    }
  }
  async delete(id: number) {
    await this.evaluate.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
