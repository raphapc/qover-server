import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async isValidLogin(userName: string, pass: string): Promise<boolean> {
    const user = await this.usersService.findOne(userName);

    if (!!user && user?.password === pass) {
      return true;
    }
    else {
      return false;
    }
  }
}
