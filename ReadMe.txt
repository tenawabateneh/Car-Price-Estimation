// From the Bignning to the End...

// To create a new app called 'Car-Price-Estimation-API'
nest new Car-Price-Estimation-API

// To create Modules
nest g module users
nest g module reports

// To create Services
nest g service users
nest g service reports

// To create Controllers
nest g controller users
nest g controller reports


// To install TYPEORM and Sqlite
npm install @nestjs/typeorm typeorm sqlite3

// To run sqlite DB, 
// First create a new file 'db.sqlite' where you want
-- GO --> view  -> command palette -> write: SQLite Database  -> click on
 the current dir which 'db.sqlite' where found ---> you'll get the DB in VSEditor: left-bottom side as 'SQLITE EXPLORER'

// To install a class-validator package and use it in a dto
npm install class-validator class-transformer

// To Install Cookie-session
npm install cookie-session @types/cookie-session


// To run the project in a Development-Environment
npm run start:dev


// To run the project in a Testing-Environment for Unit-TEsting
npm run test:watch


// To run the project in a Testing-Environment for Integration-Testing(end-to-end testing)
npm run test:e2e


// To Install ConfigService
npm install @nestjs/config




// To Install cross-env
// This library allowing us to setup d/t environment variables
npm install cross-env


