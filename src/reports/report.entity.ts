import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm"

import { UserEntity } from "../users/user.entity";

@Entity()
export class ReportEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number

  @Column()
  lng: number

  @Column()
  lat: number

  @Column()
  mileage: number

  // Make a relationship with the User entity
  @ManyToOne(() => UserEntity, (user) => user.reports)
  user: UserEntity
}