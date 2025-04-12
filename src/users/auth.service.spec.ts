import { Test } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { UserEntity } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";


describe("AuthService Unit-Testing", () => {
  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    // Create a fake copy of UsersService

    const users: UserEntity[] = []
    fakeUsersService = {
      find: (email: string) => {

        const filteredUsers = users.filter((user) => user.email === email)
        return Promise.resolve(filteredUsers)
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password
        } as UserEntity;
        users.push(user)

        return Promise.resolve(user)
      }
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
      ],
    }).compile()

    service = module.get(AuthService)
  })

  it("Can create an instance of AuthService", async () => {
    expect(service).toBeDefined()
  })


  it('Creates a new user with salted and hased password', async () => {
    const user = await service.signUp("test@test.com", "asdf")

    expect(user.password).not.toEqual('asdf')
    const [salt, hash] = user.password.split('.')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })


  it("Throws an error whenever user SIGNUP with email that is INUSE", async () => {
    await service.signUp("test@test.com", "asdf")

    await expect(service.signUp("test@test.com", "asdf")).rejects.toThrow(
      BadRequestException,
    );
  })


  it('Throws an error if signin is called with an unused email', async () => {
    await expect(
      service.signIn('asdflkj@as;dlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });


  it("Throws an error if invalide password is provided", async () => {
    await service.signUp("demo@demo.com", "password")
    await expect(service.signIn("demo@demo.com", "ioeriri"))
      .rejects.toThrow(BadRequestException)
  })


  it("Return a USER if correct password is provided", async () => {
    await service.signUp("test@test.com", "mypassword")

    const user = await service.signIn("test@test.com", "mypassword")
    expect(user).toBeDefined()

  })
})
