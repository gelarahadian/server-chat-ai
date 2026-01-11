import { Request, Response } from 'express';
import {
  handleMeService,
  handleSignInUser,
  handleSignUpService,
} from "../services/user.service";
import { NextFunction } from "express";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  try {
    const user = await handleSignUpService(name, email, password);

    res.status(201).json({ message: "User created successfully", user });
  } catch (err: any) {
    next(err);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  try {
    const { user, token } = await handleSignInUser(email, password);

    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (err: any) {
    next(err);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await handleMeService(req.userId);
    return res.status(200).json({
      message: "User authenticated successfully",
      user: user,
    });
  } catch (err: any) {
    next(err);
  }
};