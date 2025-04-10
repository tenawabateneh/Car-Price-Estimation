import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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