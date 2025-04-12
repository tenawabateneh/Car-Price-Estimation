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

})
