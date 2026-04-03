export type UserInfo = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserLogout = {
  email: string;
};
