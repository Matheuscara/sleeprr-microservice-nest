import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-use.dto';
import { UsersService } from './users.service';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { CurrentUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUseDto: CreateUserDto) {
    return await this.usersService.create(createUseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@CurrentUser() user: UserDocument) {
    return user;
  }
}
