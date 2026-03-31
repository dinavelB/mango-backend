import { TokenService } from "../../utils/security/token.js";
import { AppDataSource } from "../../config/config.js";
import { Repository } from "typeorm";
import { User } from "../../schema/user.entities.js";

let authtoken: TokenService;
let repository: Repository<User>;

export async function verifyOtp(otp: string, token: string) {
  authtoken = new TokenService();

  const decoded = authtoken.verifyToken(token) as any;

  if (!decoded.otp) {
    throw new Error("No otp");
  }
  if (otp !== decoded.otp) {
    throw new Error("Invalid otp");
  }

  return;
}
