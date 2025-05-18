
import { DataSource } from 'typeorm';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/report.entity';

export default new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [UserEntity, ReportEntity],
  migrations: ['migrations/*.js'],
});



// Run the migration command:
// npx typeorm-ts-node-commonjs migration:generate ./migrations/initial-schema -d src/data-source.ts -o