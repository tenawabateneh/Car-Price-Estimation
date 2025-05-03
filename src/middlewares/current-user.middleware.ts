import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import { UsersService } from "src/users/users.service";
import { UserEntity } from "src/users/user.entity";

// IMPORTANT: This must be top-level in the module
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity | null;
    }
  }
}


@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const session = req.session || {};
    const { userId } = session;

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
