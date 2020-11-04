import { Isearch } from './../../service/search';
import { ModelDto } from './model.interface';
import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Like, Repository } from 'typeorm';
import { Model } from './model.entity';
import { responseMsg } from 'src/service/interface';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model) private readonly model: Repository<Model>,
  ) {}
  async find(
    s?: Isearch,
    id?: number,
  ): Promise<Model[] | responseMsg<Model, ModelDto> | Model> {
    if (id) {
      let model: Model = await this.model.query(
        `select * from model where id = ${id}`,
      )[0];
      return model;
    } else {
      if (s.count === undefined && s.pageSize) {
        return {
          message: 'pageSize 和 count 必须同时传递才可以执行哦',
          statusCode: 500,
        };
      } else if (s.pageSize === undefined && s.count) {
        return {
          message: 'pageSize 和 count 必须同时传递才可以执行哦',
          statusCode: 500,
        };
      }
      if (s.count !== undefined && s.pageSize !== undefined) {
        if (s.keyword) {
          let model: Model[] = await this.model.query(
            `select * from model where modelName LIKE "%${
              s.keyword
            }%" limit ${s.pageSize * 1} offset ${(s.count - 1) * s.pageSize}`,
          );
          for (var i = 0; i < model.length; i++) {
            let brand = await this.model.query(
              `SELECT
                b.*
              FROM
                model AS m,
                brand AS b
              WHERE
                b.id = m.brandId
              AND m.brandId = ${model[i].brandId}`,
            );
            let classify = await this.model.query(`
              SELECT
                c.*
              FROM
                model AS m,
                classify AS c
              WHERE
                c.id = m.classifyId
              AND m.classifyId = ${model[i].classifyId}
            `);
            model[i] = {
              ...model[i],
              brandId: brand[0],
              classifyId: classify[0],
            };
          }
          return model;
        } else {
          let model: Model[] = await this.model.query(
            `select * from model limit ${s.pageSize * 1} offset ${(s.count -
              1) *
              s.pageSize}`,
          );
          for (var i = 0; i < model.length; i++) {
            let brand = await this.model.query(
              `SELECT
                b.*
              FROM
                model AS m,
                brand AS b
              WHERE
                b.id = m.brandId
              AND m.brandId = ${model[i].brandId}`,
            );
            let classify = await this.model.query(`
              SELECT
                c.*
              FROM
                model AS m,
                classify AS c
              WHERE
                c.id = m.classifyId
              AND m.classifyId = ${model[i].classifyId}
            `);
            model[i] = {
              ...model[i],
              brandId: brand[0],
              classifyId: classify[0],
            };
          }
          return model;
        }
      } else {
        if (s.keyword) {
          return await this.model.query(
            `select * from model where modelName LIKE "%${s.keyword}%"`,
          );
        } else {
          let model: Model[] = await this.model.query(`select * from model`);
          for (var i = 0; i < model.length; i++) {
            let brand = await this.model.query(
              `SELECT
                b.*
              FROM
                model AS m,
                brand AS b
              WHERE
                b.id = m.brandId
              AND m.brandId = ${model[i].brandId}`,
            );
            let classify = await this.model.query(`
              SELECT
                c.*
              FROM
                model AS m,
                classify AS c
              WHERE
                c.id = m.classifyId
              AND m.classifyId = ${model[i].classifyId}
            `);
            model[i] = {
              ...model[i],
              brandId: brand[0],
              classifyId: classify[0],
            };
          }
          return model;
        }
      }
    }
  }

  async findOne(id: number) {
    let model = await this.model.query(`select * from model where id = ${id}`);
    return {
      message: '查询成功',
      statusCode: 200,
      data: model[0],
    };
  }

  async create(body: ModelDto) {
    const { modelName } = body;
    const isClassify = await this.model.findOne({ where: { modelName } });
    if (isClassify) {
      return {
        message: '该商品名称已经被使用',
        statusCode: 500,
      };
    } else {
      const modelEntity = await this.model.create(body);
      await this.model.save(modelEntity);
      return {
        message: '创建成功',
        statusCode: 200,
      };
    }
  }

  async update(id: number, body: ModelDto) {
    const { modelName } = body;
    const isUsers = await this.model.query(`
    Select * from model where modelName = '${modelName}'
  `);
    if (isUsers[0]) {
      if (id == isUsers[0].id) {
        await this.model.update(id, body);
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
      await this.model.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
      };
    }
  }

  async delete(id: number) {
    await this.model.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
