import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

import { UsersService } from "./users.service";
import { Script } from "vm";

const scrypt = promisify(_scrypt)    // for hashing


@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  // Let me define all methods
  async signUp(email: string, password: string) {
    // Check the email is inuse in my DB 
    const users = await this.userService.find(email)

    if (users.length > 0) {
      throw new BadRequestException("Email in use")
    }

    // Encrypt/Hash the password process starts here
    // Generate a salt
    const salt = randomBytes(8).toString('hex')

    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer

    // Join the hashed result and the salt togther
    const result = salt + '.' + hash.toString('hex')

    // Create a new user store his/her information in the database
    const user = await this.userService.create(email, result)

    // Send back the response with a cookie to client
    return user

  }

  async signIn(email: string, password: string) {
    // Check the existance of the email
    const [user] = await this.userService.find(email)


    if (!user)
      throw new NotFoundException("User not found ... Authentication Error.")

    // Decryption of the password process starts here
    // Extract the storedSalt and storedHash from the database
    const [storedSalt, storedHash] = user.password.split('.')

    // Hash the storedSalt and the new password together
    const newHash = (await scrypt(password, storedSalt, 32)) as Buffer

    // Compare the newHashed and the storedHashed passwords together
    if (storedHash !== newHash.toString('hex')) {
      console.log(newHash)
      console.log(storedHash)
      throw new BadRequestException("Your email or password is wrong...Password")
    }

    // Considered to be loggedIn
    return user


  }


}