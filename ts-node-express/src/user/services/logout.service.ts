import { Response } from "express";
import { DelRedisKey } from "../../utils/dry/del.redis.js";
import { UserLogout } from "../types/user-types.js";
import { Repository } from "typeorm";
import { User } from "../../schema/user.entities.js";
import { AppDataSource } from "../../config/config.js";

export async function Logout(user: UserLogout, res: Response) {
  let userrepo: Repository<User>;
  userrepo = AppDataSource.getRepository(User);

  try {
    await DelRedisKey(user);

    const email = await userrepo.findOne({
      where: { email: user.email },
    });

    if (!email) {
      throw new Error("user does not exists");
    }
    
  } catch (e: any) {
    console.log("error message: ", e.message);
    return;
  }

  return res.status(200).json({
    success: true,
    message: "token deleted",
  });
}
