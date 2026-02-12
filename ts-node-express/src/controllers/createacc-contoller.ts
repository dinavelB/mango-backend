import UserService from "../services/create-account.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//import service to save data
const userService = new UserService(); //instantiate class to use methods

//arrow function
//handles response and request

export const createAccount = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { email, password, confirmpassword } = userData;

    const generatedToken = jwt.sign({
      email: email,
      password: password,
    });
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
