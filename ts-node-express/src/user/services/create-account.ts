import { AppDataSource } from "../../config/config.js";
import { User } from "../../entities/user.entities.js";
import { Repository } from "typeorm";
import { UserInfo, UserLogin } from "../types/user-types.js";

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
    const user = await this.userRepository
      .createQueryBuilder("user") //param
      //.from(User, "user") //skipped this if inside already the repo
      .where("user.email = :email", { email: data.loginemail })
      .getOne();

    if (user === null) {
      throw new Error("user doesnt exists");
    }

    if (data.loginpassword !== user?.password) {
      throw new Error("xrong password");
    }
  }
}

export default UserService;
