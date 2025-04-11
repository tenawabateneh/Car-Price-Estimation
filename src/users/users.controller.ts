import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUSerDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userSerrvice: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body)
    this.userSerrvice.create(body.email, body.password)
  }

  // Serialization is a process that happens before objects 
  // are returned in a network response. 
  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log("Handler is running")
    const user = await this.userSerrvice.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException("User is not found.")
    }
    return user
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userSerrvice.find(email)
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userSerrvice.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUSerDto) {
    return this.userSerrvice.update(parseInt(id), body)
  }
}
