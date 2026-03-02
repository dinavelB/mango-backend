import { AppDataSource } from "../../config/config.js";
import { User } from "../../schema/user.entities.js";
import { Repository } from "typeorm";
import { UserInfo, UserLogin } from "../types/user-types.js";
import {
  comparePass,
  hashPass,
} from "../../utils/securities/password-hashing.js";
import { redis } from "../../config/redis.config.js";
import { TokenService } from "../../utils/security/token.js";
import { RedisSetHandler } from "../../utils/dry/redis-set.dry.js";

class UserService {
  private authtoken: TokenService;
  private userRepository: Repository<User>; //user as a blueprint
  private client = redis.client;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.authtoken = new TokenService();
  }

  async createUser(userData: UserInfo) {
    if (userData.password != userData.confirmpassword) {
      throw new Error("passwords doesnt match");
    }

    const user = this.userRepository.create({
      email: userData.email,
      password: await hashPass(userData.password),
    });

    const saved = await this.userRepository.save(user);
    console.log("user saved at databsse");
  }

  async userLogin(data: UserLogin) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: data.email })
      .getOne();

    if (user === null) {
      throw new Error("user doesnt exists");
    }

    const result = await comparePass(data.password, user.password);
    if (!result) {
      throw new Error("passwords do not match");
    }

    const token = this.authtoken.generateToken({
      email: data.email,
    });

    const redisUser = await RedisSetHandler({
      email: user.email,
      verificationToken: token,
    });

    return redisUser;
  }
}

export default UserService;
