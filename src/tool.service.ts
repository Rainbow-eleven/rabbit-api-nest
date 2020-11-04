import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model/model/model.entity';

@Injectable()
export class ToolService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}
  async findTotal() {
    const model = await this.modelRepository.query(`
      select COUNT(*) as count from model
    `);
    const classify = await this.modelRepository.query(`
      select COUNT(*) as count from classify
    `);
    const brand = await this.modelRepository.query(`
      select COUNT(*) as count from brand
    `);
    const malFun = await this.modelRepository.query(`
      select COUNT(*) as count from malfunction
  `);
    const malO = await this.modelRepository.query(`
      select COUNT(*) as count from malfunction_options
  `);
    return {
      model: parseInt(model[0].count),
      classify: parseInt(classify[0].count),
      brand: parseInt(brand[0].count),
      malFun: parseInt(malFun[0].count),
      malO: parseInt(malO[0].count),
    };
  }
}
