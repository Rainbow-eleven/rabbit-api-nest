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
    const data = await this.evad.query(`
      SELECT
        *
      FROM
        evaluate_detail 
    `);
    return {
      message: '查询成功',
      statusCode: 200,
      data: data,
    };
  }
  async create(body: EvaluateDetailDto) {
    const MalData = await this.evad.query(`
    SELECT
      ma.*, mo.id AS 'modelId',
      mo.modelName
    FROM
      model AS mo,
      malfunction AS ma
    WHERE
      mo.id = ma.modelIdId
    AND ma.id = ${body.malfId}
    `)
    const OptionData = await this.evad.query(`
    
    `)
    // const evaluate = await this.evad.create(body);
    // await this.evad.save(evaluate);
    return {
      message: '创建成功',
      statusCode: 200,
    };
  }
  // async update(id: number, body: EvaluateDetailDto) {
  //   const eva = await this.evad.query(
  //     `select * from evaluate where modelidid = '${body.modelId}'`,
  //   );
  //   const idEva = await this.evad.find({ modelId: body.modelId, id });
  //   if (!eva[0]) {
  //     await this.evad.update(id, body);
  //     return {
  //       message: '更新成功',
  //       statusCode: 200,
  //     };
  //   } else {
  //     if (idEva[0]) {
  //       await this.evad.update(id, body);
  //       return {
  //         message: '更新成功',
  //         statusCode: 200,
  //       };
  //     } else {
  //       return {
  //         message: '模型ID已存在',
  //         statusCode: 500,
  //       };
  //     }
  //   }
  // }
  async delete(id: number) {
    await this.evad.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
