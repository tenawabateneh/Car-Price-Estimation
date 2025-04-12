import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";

import { UsersService } from "../users.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) { }

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest()

    // Extract userId from session since the interceptors has an access to request Object
    const { userId } = request.session;

    if (userId) {
      const user = await this.usersService.findOne(userId)
      // Set a currentUser attribute with value for latter use in the decorator
      request.currentUser = user
    }

    return handler.handle()
  }
}