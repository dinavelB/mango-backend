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

  async createUser(userData: UserInfo): Promise<Partial<User>> {
    try {
      if (userData.password != userData.confirmpassword) {
        throw new Error("passwords doesnt match");
      }

      const user = this.userRepository.create({
        email: userData.email,
        password: userData.password,
      });

      const saved = await this.userRepository.save(user); //typeorm is async
      console.log("user saved at databsse");

      //filter an object
      //dont return password
      const { password, ...filteredData } = saved;

      return filteredData;
    } catch (error: any) {
      //re catch here
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}

export default UserService;
