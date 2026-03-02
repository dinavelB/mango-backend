import bcrypt from "bcrypt";

//needs async? check documentation
//password, salt
export async function hashPass(password: string): Promise<string> {
  const salt: number = 10;
  const userPassword = password;

  return await bcrypt.hash(userPassword, salt);
}

//structre: plainpassword, hashedPass
export async function comparePass(
  plainPass: string,
  hashedPass: string,
): Promise<boolean> {
  const result = await bcrypt.compare(plainPass, hashedPass);

  return result;
}
