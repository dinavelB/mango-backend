import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN, JWT_ALGORITHM } = process.env;

class Auth {
  secretKey: any;
  algo: any;
  expiration: any;

  constructor() {
    this.secretKey = JWT_SECRET || "fallback_key";
    this.expiration = JWT_EXPIRES_IN || "1d";
  }

  //structure payload and options and default options and sign token
  generateToken(payload: string, options = {}) {
    const defaultOpt = {
      expiresIn: this.expiration,
      algorithm: this.algo,
    };

    const signedPayload = jwt.sign(payload, this.secretKey, {
      ...defaultOpt,
      ...options,
    });

    return signedPayload;
  }

  //strucuture: token, options{}
  //jwt.verify(token, this.secret, options);
  verifyToken(token: string, opts = {}) {
    try {
      const verifyToken = jwt.verify(token, this.secretKey, opts);
    } catch (err) {
      throw new Error("invalid token or expired token");
    }
  }

  // Decode token without verification
  decodeToken(token: string) {
    return jwt.decode(token);
  }

  // Generate tokens with different types
  generateAccessToken(payload: string) {
    return this.generateToken(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    });
  }

  generateRefreshToken(payload: string) {
    return this.generateToken(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });
  }
}
