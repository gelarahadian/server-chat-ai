import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import User from "../models/User";
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

export const createUser = async (user: any) => {
  const newUser = await User.create(user);
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};
