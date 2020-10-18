import { UserDto } from './user.interface';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Like, Repository } from 'typeorm';
import { responseMsg } from '../../service/interface'

interface Isearch {
  keyword: string,
  count?: number,
  pageSize?: number
}
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async find(s?: Isearch, id?: number,): Promise<User[] | responseMsg<User, UserDto> | User> {
    if (id) {
      return await this.userRepository.findOne({ where: { id } });
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
  async createOne(user: UserDto): Promise<responseMsg<User, UserDto>> {
    const { account } = user;
    const isUser = await this.userRepository.findOne({ where: { account } });
    if (isUser === undefined) {
      const userEneity = await this.userRepository.create(user)
      await this.userRepository.save(userEneity);
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
  async update(id: number, body: UserDto): Promise<responseMsg<User, UserDto>> {
    const { account } = body;
    const isUser = await this.userRepository.findOne({ where: { account } });
    if (isUser === undefined) {
      await this.userRepository.update(id, body);
      return {
        message: "更新成功",
        statusCode: 200
      }
    } else {
      return {
        message: "该账户已经被注册",
        statusCode: 500,
      }
    }
  }
  async deleteOne(id: number): Promise<responseMsg<User, UserDto>> {
    await this.userRepository.delete(id)
    return {
      message: "删除成功",
      statusCode: 200,
    }
  }
}
