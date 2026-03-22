import UserService from "../services/create-account.js";
import { Request, Response } from "express";
import { ErrorHandler } from "../../utils/dry/error.dry.js";
import { CookieParserService } from "../../utils/security/cookie-parser.security.js";
import { Logout } from "../services/logout.service.js";

class UserController {
  private cookie: CookieParserService;
  private userService: UserService;
  constructor() {
    this.cookie = new CookieParserService();
    this.userService = new UserService();
  }

  createAccount = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);

      res.status(201).json({
        message: "Email verification sent",
      });
    } catch (err: any) {
      res.status(401).json({
        error: err.message,
      });
    }
  };

  userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const { token } = await this.userService.userLogin(req.body);

      this.cookie.setAuthCookies({ email: email }, token, res);

      res.status(201).json({
        success: true,
        data: {
          message: "logged in successfully",
        },
      });
    } catch (e: any) {
      ErrorHandler(e);
      res.status(401).json({
        message: e.message,
      });
    }
  };

  Logout = async (req: Request, res: Response) => {
    const email = req.query.email;

    if (typeof email !== "string") {
      throw new Error("Invalid email format");
    }
    return await Logout({ email }, res);
  };
}

export default UserController;
