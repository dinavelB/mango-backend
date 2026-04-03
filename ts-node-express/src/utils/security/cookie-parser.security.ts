import { Response } from "express";
import { CookieDataResponse } from "../../user/interface/cookie-responses.js";

export class CookieParserService {
  private cookieLife = 24 * 60 * 60 * 1000;
  private authCookie = 10 * 60 * 1000;

  setAuthCookies(
    responseData: CookieDataResponse,
    token: string,
    res: Response,
  ) {
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: this.authCookie,
      path: "/",
    });

    res.cookie("user", JSON.stringify(responseData), {
      httpOnly: false,
      path: "/",
      maxAge: this.authCookie,
    });
  }
}
