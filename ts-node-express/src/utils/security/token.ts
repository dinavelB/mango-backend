import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PayloadToken } from "../../common/interfaces/payload.interface.js";
dotenv.config();

export class TokenService {
  private secretkey: string;
  constructor() {
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    this.secretkey = JWT_SECRET || "binongofeb0206";
  }

  generateToken(payload: PayloadToken) {
    return jwt.sign(payload, this.secretkey, {
      expiresIn: "1d",
    });
  }

  verifyToken(token: string) {
    try {
      // automatically checks if the token expired no need to manually validate
      const verifyToken = jwt.verify(token, this.secretkey);

      return verifyToken;
    } catch (e: any) {
      console.log("error:", e.message);
    }
  }

  decodeToken(token: string) {
    return jwt.decode(token);
  }
}
