import { UserDto } from './user.interface';
import { User } from './user.eneity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Like, Repository } from 'typeorm';

export interface responseMsg {
  message: string;
  statusCode: number;
  data?: User[] | UserDto;
}
interface Isearch {
  keyword: string,
  count?: number,
  pageSize?: number
}
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async find(s?: Isearch, id?: number,): Promise<User[] | responseMsg> {
    if (id) {
      return await this.userRepository.find({ where: { id } });
    } else {
      if (s.count === undefined && s.pageSize) {
        return {
          message: "pageSize 和 count 必须同时传递才可以执行哦",
          statusCode: 500
        }
      } else if (s.pageSize === undefined && s.count) {
        return {
          message: "pageSize 和 count 必须同时传递才可以执行哦",
          statusCode: 500
        }
      }
      if (s.count !== undefined && s.pageSize !== undefined) {
        if (s.keyword) {
          return createQueryBuilder(User, 'user').select(['*']).where({ userName: Like(`%${s.keyword}%`) },).offset((s.count - 1) * s.pageSize).limit(s.pageSize * 1)
            .getRawMany(); // 获得原始结果
        } else {
          return createQueryBuilder(User, 'user').select(['*']).offset((s.count - 1) * s.pageSize).limit(s.pageSize * 1)
            .getRawMany(); // 获得原始结果
        }
      }
      else {
        if (s.keyword) {
          return createQueryBuilder(User, 'user').select(['*']).where({ userName: Like(`%${s.keyword}%`) },)
            .getRawMany(); // 获得原始结果
        } else {
          return createQueryBuilder(User, 'user').select(['*'])
            .getRawMany(); // 获得原始结果
        }

      }
    }
  }
  async createOne(user: UserDto): Promise<responseMsg> {
    const { account } = user;
    const isUser = await this.userRepository.findOne({ where: { account } });
    if (isUser === undefined) {
      const userEntity = await this.userRepository.create(user)
      await this.userRepository.save(userEntity);
      return {
        message: "注册成功",
        statusCode: 200,
      }
    } else {
      return {
        message: "该账户已经被注册",
        statusCode: 500,
      }
    }
  }
  async update(id: number, body: UserDto): Promise<responseMsg> {
    const { account } = body;
    const isUser = await this.userRepository.findOne({ where: { account } });
    if (isUser === undefined) {
      await this.userRepository.update(id, body);
      return {
        message: "修改成功",
        statusCode: 200
      }
    } else {
      return {
        message: "该账户已经被注册",
        statusCode: 500,
      }
    }
  }
  async deleteOne(id: number): Promise<responseMsg> {
    await this.userRepository.delete(id)
    return {
      message: "删除成功",
      statusCode: 200,
    }
  }
}
