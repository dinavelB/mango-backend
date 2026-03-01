import { AppDataSource } from "../../config/config.js";
import { User } from "../../schema/user.entities.js";
import { Repository } from "typeorm";
import { UserInfo, UserLogin } from "../types/user-types.js";
import { comparePass } from "../../utils/securities/password-hashing.js";
//services is the main logic
//performs querying, business logic and etc.
//often async

class UserService {
  private userRepository: Repository<User>; //user as a blueprint

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: UserInfo): Promise<Partial<User>> {
    if (userData.password != userData.confirmpassword) {
      throw new Error("passwords doesnt match");
    }

    //save whats only needed.
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
  }
  catch(error: any) {
    //re catch here
    throw new Error(`Failed to create user: ${error.message}`);
  }

  async userLogin(data: UserLogin) {
    console.log("Login attempt with data:", data); // 👈 Log what's coming in

    const user = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: data.email })
      .getOne();

    console.log("Found user:", user); // 👈 Log what's found

    if (user === null) {
      console.log("Email used in query:", data.email); // 👈 Log the email used
      throw new Error("user doesnt exists");
    }

    const result = await comparePass(data.password, user.password);
    if (!result) {
      throw new Error("passwords do not match");
    }
  }
}

export default UserService;
