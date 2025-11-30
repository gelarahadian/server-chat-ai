import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import User from "../models/User";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../repositories/user.repository";
import { passwordHash, passwordVerify, sanitizeUser, signToken } from "../utils/helper";

export const handleSignUpService = async (name: string, email: string, password: string) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) throw new BadRequestError("Email is already exist")

  const hashedPassword = await passwordHash(password);

  const user: InstanceType<typeof User> = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return sanitizeUser(user)
}

export const handleSignInUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) throw new BadRequestError("User not found!");

  const isPasswordValid = await passwordVerify(password, user.password);

  if (!isPasswordValid)  throw new BadRequestError("Invalid Password");

  const token = signToken(String(user._id));

  return {user: sanitizeUser(user), token}
}

export const handleMeService = async (userId: string) => {

  const user = await getUserById(userId)

  if (!user) throw new NotFoundError("User not found!");

  return sanitizeUser(user)
}

