import { Response, Request } from "express";
import { verifyOtp } from "../services/verifyotp.service.js";

export const VerifyOtp = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies?.["auth_token"];

    const { otp } = req.body;

    await verifyOtp(otp, sessionToken);
    res.status(200).json({
      success: true,
    });
  } catch (e: any) {
    res.status(401).json({
      error: e.message,
    });
  }
};
