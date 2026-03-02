import { Response } from "express";
import { CookieDataResponse } from "../../user/interface/res-cookie.interface.js";

export class CookieParserService {
  private cookieLife = 24 * 60 * 60 * 1000;

  setAuthCookies(
    responseData: CookieDataResponse,
    token: string,
    res: Response,
  ) {
    res.cookie("session_token", token, {
      httpOnly: true,
      maxAge: this.cookieLife,
      path: "/",
    });

    res.cookie("user", JSON.stringify(responseData), {
      httpOnly: false,
      path: "/",
      maxAge: this.cookieLife,
    });
  }
}
