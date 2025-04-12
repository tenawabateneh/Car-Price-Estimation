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
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as UserEntity)
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
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: "dF", password: "ad" } as UserEntity])

    await expect(service.signUp("test@test.com", "asdf")).rejects.toThrow(
      BadRequestException,
    );
  })

  it('Throws an error if signin is called with an unused email', async () => {
    await expect(
      service.signIn('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it("Throws an error if invalide password is provided", async () => {
    fakeUsersService.find = () => Promise.resolve([{
      email: "test@test.com", password: "password12"
    } as UserEntity
    ])
    await expect(service.signIn("jdlklk@jjdfj.com", "ioeriri"))
      .rejects.toThrow(BadRequestException)
  })


  it("Return a USER if correct password is provided", async () => {
    fakeUsersService.find = () => Promise.resolve([{
      email: "test@test.com",
      password: '11f1fbcc5cb485b4.cc2f6b639ec965eeb032d3795b6c5afbf5aa034513d43d6ab2d455a171185594'
    } as UserEntity
    ])

    const user = await service.signIn("test@test.com", "mypassword")
    expect(user).toBeDefined()

  })
})
