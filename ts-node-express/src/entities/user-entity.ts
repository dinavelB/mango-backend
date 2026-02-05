import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { hashPass, comparePass } from "../utils/securities/password-hashing.js";

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: "user" })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPass() {
    if (this.password) {
      this.password = await hashPass(this.password);
    }
  }

  async compare(plainpass: string) {
    return await comparePass(plainpass, this.password);
  }
}
