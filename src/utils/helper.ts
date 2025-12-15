import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config";

const passwordHash = async (password: string) => {
  return bcrypt.hash(password, 10);
};

const passwordVerify = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

const signToken = (id: string) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

function sanitizeUser(user: any) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.__v;
  return obj;
}

export { passwordHash, passwordVerify, signToken, sanitizeUser };
