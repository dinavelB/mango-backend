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
    const email = await userrepo.findOne({
      where: { email: user.email },
    });

    if (!email) {
      throw new Error("user not found");
    }

    await DelRedisKey(user);

    return res.status(200).json({
      success: true,
      message: "token deleted",
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: e.message,
    });
  }
}
