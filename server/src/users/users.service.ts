import { UserDto } from './../interfaces/user.dto';
import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  async findOne(UserDto: string): Promise<User | undefined> {
  }
}