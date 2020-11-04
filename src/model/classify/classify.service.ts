import { Injectable } from '@nestjs/common';
import { ClassifyDto } from './classity.interface';
import { Classify } from './classify.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { responseMsg } from '../../service/interface';
@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(Classify)
    private readonly classifyrRepository: Repository<Classify>,
  ) {}
  async find(id?: number): Promise<responseMsg<Classify, ClassifyDto>> {
    if (id) {
      const res = await this.classifyrRepository.findOne({ where: { id } });
      return {
        message: '查询成功',
        statusCode: 200,
        data: res,
      };
    } else {
      const res = await this.classifyrRepository.find();
      return {
        message: '查询成功',
        statusCode: 200,
        data: res,
      };
    }
  }
  async create(body: ClassifyDto): Promise<responseMsg<Classify, ClassifyDto>> {
    const { classifyName } = body;
    const isClassify = await this.classifyrRepository.findOne({
      where: { classifyName },
    });
    if (isClassify) {
      return {
        message: '该类型名称已经被使用',
        statusCode: 500,
      };
    } else {
      const classEneity = await this.classifyrRepository.create(body);
      await this.classifyrRepository.save(classEneity);
      return {
        message: '创建成功',
        statusCode: 200,
      };
    }
  }
  async update(
    id: number,
    body: ClassifyDto,
  ): Promise<responseMsg<Classify, ClassifyDto>> {
    const { classifyName } = body;
    const isUsers = await this.classifyrRepository.query(`
    Select * from classify where classifyName = '${classifyName}'
  `);
    if (isUsers[0]) {
      if (id == isUsers[0].id) {
        await this.classifyrRepository.update(id, body);
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
      await this.classifyrRepository.update(id, body);
      return {
        message: '更新成功',
        statusCode: 200,
      };
    }
  }
  async delete(id: number): Promise<responseMsg<Classify, ClassifyDto>> {
    await this.classifyrRepository.delete(id);
    return {
      message: '删除成功',
      statusCode: 200,
    };
  }
}
