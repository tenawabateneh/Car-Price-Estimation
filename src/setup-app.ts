import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session')

export const setupApp = (app: any) => {
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.use(
    cookieSession({
      keys: ["wowwow"]
    })
  )
}