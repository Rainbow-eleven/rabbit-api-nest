import { Isearch } from './../../service/search';
import { ModelDto } from './model.interface';
import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Like, Repository } from 'typeorm';
import { Model } from './model.entity';
import { responseMsg } from 'src/service/interface';
import { ApiParam } from '@nestjs/swagger';

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
      return await this.model.findOne({ where: { id } });
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
          return createQueryBuilder(Model)
            .select(['*'])
            .where({ modelName: Like(`%${s.keyword}%`) })
            .offset((s.count - 1) * s.pageSize)
            .limit(s.pageSize * 1)
            .getRawMany(); // 获得原始结果
        } else {
          return createQueryBuilder(Model)
            .select(['*'])
            .offset((s.count - 1) * s.pageSize)
            .limit(s.pageSize * 1)
            .getRawMany(); // 获得原始结果
        }
      } else {
        if (s.keyword) {
          return createQueryBuilder(Model)
            .select(['*'])
            .where({ modelName: Like(`%${s.keyword}%`) })
            .getRawMany(); // 获得原始结果
        } else {
          return createQueryBuilder(Model)
            .select(['*'])
            .getRawMany(); // 获得原始结果
        }
      }
    }
  }

  async findOne(id: number) {
    let classify = await this.model.query(
      `select * from brand where id = ${id}`,
    );
    const data = await this.model.query(`select b.* from  brand as a ,model as b
    where a.id = b.brandIdId  and b.brandIdId=${id}`);
    classify = { ...classify[0], models: data };
    return {
      message: '查询成功',
      statusCode: 200,
      data: classify,
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
    const isClassify = await this.model.findOne({ where: { modelName } });
    if (isClassify) {
      return {
        message: '该商品名称已经被使用',
        statusCode: 500,
      };
    } else {
      await this.model.update(id, body);
      return {
        message: '修改成功',
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
