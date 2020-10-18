import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { responseMsg } from 'src/service/interface';
import { BrandDto } from './brand.interface';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private readonly brandRepository: Repository<Brand>) { }
  async find(id?: number): Promise<responseMsg<Brand, BrandDto>> {
    if (id) {
      const res = await this.brandRepository.findOne({ where: { id } })
      return {
        message: "查询成功",
        statusCode: 200,
        data: res
      }
    } else {
      const res = await this.brandRepository.find()
      return {
        message: "查询成功",
        statusCode: 200,
        data: res
      }
    }
  }
  async create(body: BrandDto): Promise<responseMsg<Brand, BrandDto>> {
    const { brandName } = body;
    const isClassify = await this.brandRepository.findOne({ where: { brandName } })
    if (isClassify) {
      return {
        message: "该品牌名称已经被使用",
        statusCode: 500,
      }
    } else {
      const classEneity = await this.brandRepository.create(body)
      await this.brandRepository.save(classEneity);
      return {
        message: "创建成功",
        statusCode: 200,
      }
    }
  }
  async update(id: number, body: BrandDto): Promise<responseMsg<Brand, BrandDto>> {
    const { brandName } = body;
    const isClassify = await this.brandRepository.findOne({ where: { brandName } })
    if (isClassify) {
      return {
        message: "该品牌名称已经被使用",
        statusCode: 500,
      }
    } else {
      await this.brandRepository.update(id, body)
      return {
        message: "更新成功",
        statusCode: 200,
      }
    }
  }
  async delete(id: number): Promise<responseMsg<Brand, BrandDto>> {
    await this.brandRepository.delete(id)
    return {
      message: "删除成功",
      statusCode: 200
    }
  }
}
