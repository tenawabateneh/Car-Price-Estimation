import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUSerDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userSerrvice: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body)
    this.userSerrvice.create(body.email, body.password)
  }


  @Get('/:id')
  async findUser(@Param('id') id: string) {
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
