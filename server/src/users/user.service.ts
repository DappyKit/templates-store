import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}


  public async createUser({id, userName, displayName, photoUrl}): Promise<User> {
    const savedUser = await this.findUser(id);
    
    if (savedUser) return savedUser;

    const user = this.userRepository.create({
      id,
      userName,
      displayName,
      photoUrl,
    });
    return this.userRepository.save(user);
  }

  public findUser(id: number): Promise<User>{
   return this.userRepository.findOneBy({ id });
  }


}
