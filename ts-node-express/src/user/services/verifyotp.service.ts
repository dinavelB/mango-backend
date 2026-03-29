import { TokenService } from "../../utils/security/token.js";
import { AppDataSource } from "../../config/config.js";
import { Repository } from "typeorm";
import { User } from "../../schema/user.entities.js";

let authtoken: TokenService;
let repository: Repository<User>;

export async function verifyOtp(token: string) {
  authtoken = new TokenService();

  repository = AppDataSource.getRepository(User);

  const decoded = authtoken.verifyToken(token) as any;

  const user = await repository.findOne({
    where: { user_otp: decoded.otp },
  });
}
