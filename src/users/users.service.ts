import { Injectable } from '@nestjs/common';
import { User } from './model/user';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'Qover',
        password: 'Ninja',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name.toLowerCase() === username.toLowerCase());
  }
}
