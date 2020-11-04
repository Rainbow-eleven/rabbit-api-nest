import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createConnection } from 'net';
import { responseMsg } from 'src/service/interface';
import {
  createQueryBuilder,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Classify } from '../classify/classify.entity';
import { BrandClassifyRelation } from './brand-classify-relation.entity';
import { BrandClassifyRelationDto } from './brand-classify-relation.interface';

@Injectable()
export class BrandClassifyRelationService {
  constructor(
    @InjectRepository(BrandClassifyRelation)
    private readonly brandRepository: Repository<BrandClassifyRelation>,
  ) {}
  async find(
    id?: number,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    if (id) {
      const brand = await this.brandRepository.query(
        `select a.* from  brand as a ,brand_classify_relation as b
        where a.id=b.brandidid  and b.classifyidid=${id}`,
      );
      let classify = await this.brandRepository.query(
        `select * from classify where id = ${id}`,
      );
      if (classify.length > 0) {
        classify = { ...classify[0], brands: brand };
        return {
          message: '查询成功',
          statusCode: 200,
          data: classify,
        };
      } else {
        return {
          message: '查询成功',
          statusCode: 200,
          data: [],
        };
      }
    } else {
      // let BrandClassifyRelationReposity = getRepository(BrandClassifyRelation);
      // const data = await BrandClassifyRelationReposity.find({
      //   relations: ['classifyId', 'brandId'],
      // });
      let data = [];
      let count = await this.brandRepository.query(`select * from classify`);
      for (var i = 1; i <= count.length; i++) {
        const brand = await this.brandRepository.query(
          `select a.* from  brand as a ,brand_classify_relation as b
          where a.id=b.brandidid  and b.classifyidid=${i}`,
        );
        let classify = await this.brandRepository.query(
          `select * from classify where id = ${i}`,
        );
        classify = { ...classify[0], brands: brand };
        data.push(classify);
      }
      return {
        message: '查询成功',
        statusCode: 200,
        data,
      };
    }
  }
  async create(
    body: BrandClassifyRelationDto,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    const classEneity = await this.brandRepository.create(body);
    await this.brandRepository.save(classEneity);
    return {
      message: '创建成功',
      statusCode: 200,
    };
  }
  async update(
    id: number,
    body: BrandClassifyRelationDto,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    await this.brandRepository.update(id, body);
    return {
      message: '更新成功',
      statusCode: 200,
    };
  }
  async delete(
    id: number,
  ): Promise<responseMsg<BrandClassifyRelation, BrandClassifyRelationDto>> {
    await this.brandRepository.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
