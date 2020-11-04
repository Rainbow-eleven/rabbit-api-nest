import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { responseMsg } from 'src/service/interface';
import { BrandDto } from './brand.interface';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async find(id?: number): Promise<responseMsg<Brand, BrandDto>> {
    if (id) {
      let res = await this.brandRepository.findOne({ where: { id } });
      return {
        message: '查询成功',
        statusCode: 200,
        data: res,
      };
    } else {
      let brand: Brand[] = await this.brandRepository.query(
        `select * from brand`,
      );
      for (var i = 0; i < brand.length; i++) {
        let classify = await this.brandRepository.query(
          `SELECT
              c.*
            FROM
              brand AS b,
              classify AS c
            WHERE
              c.id = b.classifyId
            AND b.classifyId = ${brand[i].classifyId}`,
        );
        brand[i] = { ...brand[i], classifyId: classify[0] };
      }
      return {
        message: '查询成功',
        statusCode: 200,
        data: brand,
      };
    }
  }
  async create(body: BrandDto): Promise<responseMsg<Brand, BrandDto>> {
    const { brandName } = body;
    const isClassify = await this.brandRepository.findOne({
      where: { brandName },
    });
    if (isClassify) {
      return {
        message: '该品牌名称已经被使用',
        statusCode: 500,
      };
    } else {
      const classEneity = await this.brandRepository.create(body);
      await this.brandRepository.save(classEneity);
      return {
        message: '创建成功',
        statusCode: 200,
      };
    }
  }
  async update(
    id: number,
    body: BrandDto,
  ): Promise<responseMsg<Brand, BrandDto>> {
    const { brandName } = body;
    const isUsers = await this.brandRepository.query(`
    Select * from brand where brandName = '${brandName}'
  `);
    if (isUsers[0]) {
      if (id == isUsers[0].id) {
        await this.brandRepository.update(id, body);
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
      await this.brandRepository.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
      };
    }
  }
  async delete(id: number): Promise<responseMsg<Brand, BrandDto>> {
    await this.brandRepository.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
