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
import { email } from "../../email/email.service.js";
import { CookieParserService } from "../../utils/security/cookie-parser.security.js";
import { Response } from "express";
class UserService {
  private authtoken: TokenService;
  private userRepository: Repository<User>; //user as a blueprint
  private client = redis.client;
  private cookie: CookieParserService;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.authtoken = new TokenService();
    this.cookie = new CookieParserService();
  }

  async createUser(userData: UserInfo, res: Response) {
    const duplicate = await this.userRepository.findOne({
      where: {
        user_email: userData.email,
      },
    });
    if (duplicate) {
      throw new Error("User already exists");
    }

    await email.sendVerificationEmail(userData.email);

    const user = this.userRepository.create({
      firstname: userData.firstname,
      lastname: userData.lastname,
      user_email: userData.email,
      user_password: await hashPass(userData.password),
      veificationToken: this.authtoken.generateToken({
        email: userData.email,
        otp: email.otp,
      }),
    });

    this.cookie.setAuthCookies(
      { email: user.user_email, otp: email.otp },
      user.veificationToken,
      res,
    );

    const saved = await this.userRepository.save(user);
  }

  async userLogin(data: UserLogin) {
    const user = await this.userRepository.findOne({
      where: { user_email: data.email },
    });

    if (!user) {
      throw new Error("user doesnt exists");
    }

    const result = await comparePass(data.password, user.user_password);
    if (!result) {
      throw new Error("passwords do not match");
    }

    const token = this.authtoken.generateToken({
      email: data.email,
    });

    const redisUser = await RedisSetHandler({
      email: user.user_email,
      verificationToken: token,
    });

    return redisUser;
  }
}

export default UserService;
