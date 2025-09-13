import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<User> {
    return this.usersService.create(username, password, role);
  }

  // 🔹 新增登录接口
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ username: string; role: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return { username: user.username, role: user.role };
  }
}
