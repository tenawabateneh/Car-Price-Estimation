import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: "asdf@asdf.com", password: "asdf" } as UserEntity)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: "asdf" } as UserEntity])
      },
      // remove: () => { },
      // update: () => { },
    }
    fakeAuthService = {
      // signUp: () => { }
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as UserEntity)
      },
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("Function findAllUsers returns a list of users with the given email", async () => {
    const users = await controller.findAllUsers('asdf@asdf.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('asdf@asdf.com')
  })

  it('Function findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })

  it('Function findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('Function signIn session object and returns user', async () => {
    const session = { userId: -10 }
    const user = await controller.signIn({ email: "asdf@asdf.com", password: "asdf" }, session,)

    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  });

});
