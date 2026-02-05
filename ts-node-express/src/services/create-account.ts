import { error } from "node:console";
import { AppDataSource } from "../config/config.js";
import db from "../config/test-conf.js";
import { User } from "../entities/user-entity.js";
import { Repository } from "typeorm";
import { UserInfo } from "../types/user-types.js";

//services is the main logic
//performs querying, business logic and etc.
//often async

class UserService {
  private userRepository: Repository<User>; //user as a blueprint

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: UserInfo): Promise<User> {
    try {
      const user = this.userRepository.create(userData);

      console.log("user saved at databsse");
      return await this.userRepository.save(user); //the beforeinsert happens here
    } catch (error: any) {
      console.log("error saving user", error);

      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}

export default UserService;
