import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm"

import { ReportEntity } from "src/reports/report.entity";

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // Make a relationship with the Report entity
  @OneToMany(() => ReportEntity, (repo) => repo.user)
  reports: ReportEntity;

  @AfterInsert()
  logInsert() {
    console.log("Inserted a User with ID", this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log("Updated a User with ID", this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log("Removed a User with ID", this.id)
  }
}