import { UserDto } from './user.interface';
import { User } from './user.eneity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async createOne(user: UserDto): Promise<unknown> {
    return await this.userRepository.save(user);
  }
}
