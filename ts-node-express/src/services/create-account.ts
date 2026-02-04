import { error } from "node:console";
import { AppDataSource } from "../config/config.js";
import db from "../config/database.js";
import { User } from "../entities/user-entity.js";
import { Repository } from "typeorm";

//services is the main logic
//performs querying, business logic and etc.
//often async

class UserService {
  private userRepository: Repository<User>; //user as a blueprint

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const user = this.userRepository.create(userData);
      return await this.userRepository.save(user);
    } catch (error: any) {
      console.log("error saving user", error);

      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}

export default UserService;
