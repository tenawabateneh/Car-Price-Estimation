import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dbConfig from '../ormconfig'; // Import your config

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/report.entity';
const cookieSession = require('cookie-session')



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // I setup & added a Global ValidationPipe here
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      })
    }
  ],
})

export class AppModule {
  // I Setup here the global cookie-session middleware 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: ["wowwow"]
    }))
      .forRoutes('*')

  }
}




// ######################################################################################
// import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
// import { APP_PIPE } from '@nestjs/core';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { ReportsModule } from './reports/reports.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './users/user.entity';
// import { ReportEntity } from './reports/report.entity';
// const cookieSession = require('cookie-session')
// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: `.env.${process.env.NODE_ENV}`,
//     }),

//     TypeOrmModule.forRoot(
//       //   {
//       //   type: 'postgres', // or 'mysql', 'sqlite', etc.
//       //   host: 'localhost',
//       //   port: 5432,
//       //   username: 'test',
//       //   password: 'test',
//       //   database: 'test',
//       //   entities: ['**/*.entity.js'],
//       //   synchronize: false, // be careful with this in production
//       // }
//     ),


//     // TypeOrmModule.forRootAsync({
//     //   inject: [ConfigService],
//     //   useFactory: (config: ConfigService) => {
//     //     return {
//     //       type: 'sqlite',
//     //       //  Creating Separate Test and Dev Databases through parssing dynamically
//     //       database: config.get<string>('DB_NAME'),
//     //       synchronize: true,
//     //       entities: [UserEntity, ReportEntity],
//     //     }
//     //   }
//     // }),

//     // TypeOrmModule.forRoot({
//     //   type: 'sqlite',
//     //   //  Creating Separate Test and Dev Databases to Solve Failures Around Repeat Test Runs
//     //   // Here's below the way in comment section:
//     //   //  database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
//     //   database: 'db.sqlite',
//     //   entities: [UserEntity, ReportEntity],
//     //   synchronize: true,
//     // }),
//     UsersModule,
//     ReportsModule
//   ],
//   controllers: [AppController],
//   providers: [AppService,
//     // I setup & added a Global ValidationPipe here
//     {
//       provide: APP_PIPE,
//       useValue: new ValidationPipe({
//         whitelist: true,
//       })
//     }
//   ],
// })

// export class AppModule {
//   constructor(
//     private configService: ConfigService
//   ) { }

//   // I Setup here the global cookie-session middleware
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(cookieSession({
//       keys: [this.configService.get("COOKIE_KEY")]
//     }))
//       .forRoutes('*')

//   }
// }


