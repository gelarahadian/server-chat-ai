import User from "../models/userModel";

export const createUser = async (user: any) => {
    const newUser = await User.create(user);
    return newUser;
}

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
}

export const getUserById = async (id: string) => {
    const user = await User.findById(id);
    return user;
}