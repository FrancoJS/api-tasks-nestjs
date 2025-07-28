import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
// import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser() {
    return this.userService.createUser();
  }
}
