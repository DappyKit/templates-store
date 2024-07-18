import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}


  async createUser({id, userName, displayName, photoUrl}): Promise<User> {
    const user = this.userRepository.create({
      id,
      userName,
      displayName,
      photoUrl,
    });

    return this.userRepository.save(user);
  }
}
