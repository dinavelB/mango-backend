import UserService from "../services/create-account.js";
import { Request, Response } from "express";
import { ErrorHandler } from "../../utils/dry/error.dry.js";
import { TokenService } from "../../utils/security/token.js";
import { CookieParserService } from "../../utils/security/cookie-parser.security.js";

class UserController {
  private authtoken: TokenService;
  private cookie: CookieParserService;
  private userService: UserService;
  constructor() {
    this.authtoken = new TokenService();
    this.cookie = new CookieParserService();
    this.userService = new UserService();
  }

  createAccount = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const { email, password, confirmpassword } = userData;

      const user = await this.userService.createUser(userData); //throw new error resides here
      console.log("user created successfully");

      //data filtered by service isnt returning to frontend
      res.status(201).json({
        message: "user successfully saved",
        //data: user
      });
    } catch (err: any) {
      console.log("error:", err.message); //pertains to throw new error

      res.status(401).json({
        message: "user not successfully saved",
        error: err.message,
      });
    }
  };

  userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      await this.userService.userLogin(req.body);

      const token = this.authtoken.generateToken({
        email: email,
      });

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
        message: "Invalid email or password, try again",
        error: e.message,
      });
    }
  };
}

export default UserController;
