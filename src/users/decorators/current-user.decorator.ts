import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    // Extract userId from the request object which set by the interceptors
    const currentUser = request.currentUser;


    console.log(currentUser)
    return currentUser

  }
)