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
  Session,
  UseGuards
} from '@nestjs/common';

import { Serialize } from '../interceptors/serialize.interceptor';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUSerDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
// Serialization is a process that happens before objects 
// are returned in a network response. 
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userSerrvice: UsersService,
    private authService: AuthService
  ) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    console.log(body)
    const user = await this.authService.signUp(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null
  }

  @Get('/currentUser')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    // console.log("Handler is running")
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
