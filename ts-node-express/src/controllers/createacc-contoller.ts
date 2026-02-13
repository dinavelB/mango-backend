import UserService from "../services/create-account.js";
import { Request, Response } from "express";

const userService = new UserService();

class UserController {
  createAccount = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const { email, password, confirmpassword } = userData;

      const user = await userService.createUser(userData); //throw new error resides here
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

  async userLogin(req: Request, res: Response) {
    try {
      const dataObj = req.body;

      const data = await userService.userLogin(dataObj);

      res.status(201).json({
        message: "test",
      });
    } catch (e) {
      res.status(401).json({
        message: "error from the userlogin",
      });
      throw new Error();
    }
  }
}

export default UserController;
