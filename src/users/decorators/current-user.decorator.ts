import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CurrentUser = createParamDecorator(
  (data: any, incomingRequestContext: ExecutionContext) => {
    return 'Hey Custom Decorator'
  }
)