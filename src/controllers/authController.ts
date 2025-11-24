import { Request, Response } from 'express';
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../services/userService";
import { passwordHash, passwordVerify } from "../utils/helper";
import { signToken } from "../utils/helper";
import { sanitizeUser } from "../utils/helper";
import User from "../models/userModel";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters long" });
  }
  if (name.length > 30) {
    return res
      .status(400)
      .json({ message: "Name must be less than 30 characters long" });
  }
  if (email.length > 50) {
    return res
      .status(400)
      .json({ message: "Email must be less than 50 characters long" });
  }
  if (password.length > 50) {
    return res
      .status(400)
      .json({ message: "Password must be less than 50 characters long" });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await passwordHash(password);

  const user: InstanceType<typeof User> = await createUser({
    name,
    email,
    password: hashedPassword,
  });
  res
    .status(201)
    .json({ message: "User created successfully", user: sanitizeUser(user) });
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  if (email.length > 50) {
    return res
      .status(400)
      .json({ message: "Email must be less than 50 characters long" });
  }
  if (password.length > 50) {
    return res
      .status(400)
      .json({ message: "Password must be less than 50 characters long" });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordValid = await passwordVerify(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = signToken(String(user._id));
  res.status(200).json({
    message: "User logged in successfully",
    user: sanitizeUser(user),
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  let user; // declare dulu di luar

  if (req.userId) {
    user = await getUserById(req.userId);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    message: "User authenticated successfully",
    user: sanitizeUser(user),
  });
};