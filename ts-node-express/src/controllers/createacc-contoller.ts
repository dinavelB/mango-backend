import UserService from "../services/create-account.js";
import { NextFunction, Request, Response } from "express";

//import service to save data
const userService = new UserService(); //instantiate class to use methods

//arrow function
//handles response and request

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = req.body;

    const user = await userService.createUser(userData);

    res.status(201).json({
      message: "user successfully saved",
    });
  } catch (err: any) {
    res.status(401).json({
      message: "user not successfully saved",
    });
  }
};
