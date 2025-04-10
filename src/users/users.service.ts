import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  // repo = Repository<UserEntity>

  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
    // this.repo = repo; 
  }


  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save({ email, password })
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id })
  }

  find(email: string) {
    return this.repo.find({ where: { email } })
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.repo.findOneBy({ id })

    if (!user) {
      throw new NotFoundException("User is not found")
    }
    Object.assign(user, attrs)
    return this.repo.save(user)


  }
  async remove(id: number) {
    const user = await this.repo.findOneBy({ id })
    if (!user) {
      throw new NotFoundException("User is not found")
    }
    return this.repo.remove(user)
  }

}
