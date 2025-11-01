import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/userService';

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ message: 'All fields are required'});
    }
    if(password.length < 8){
        return res.status(400).json({ message: 'Password must be at least 8 characters long'});
    }
    if(!email.includes('@') || !email.includes('.')){
        return res.status(400).json({ message: 'Invalid email address'});
    }
    if(name.length < 3){
        return res.status(400).json({ message: 'Name must be at least 3 characters long'});
    }
    if(name.length > 30){
        return res.status(400).json({ message: 'Name must be less than 30 characters long'});
    }
    if(email.length > 50){
        return res.status(400).json({ message: 'Email must be less than 50 characters long'});
    }
    if(password.length > 50){
        return res.status(400).json({ message: 'Password must be less than 50 characters long'});
    }
    
    const user = await createUser({ name, email, password });
    res.status(201).json({ message: 'User created successfully', user });
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'All fields are required'});
    }
    if(password.length < 8){
        return res.status(400).json({ message: 'Password must be at least 8 characters long'});
    }
    if(!email.includes('@') || !email.includes('.')){
        return res.status(400).json({ message: 'Invalid email address'});
    }
    if(email.length > 50){
        return res.status(400).json({ message: 'Email must be less than 50 characters long'});
    }
    if(password.length > 50){
        return res.status(400).json({ message: 'Password must be less than 50 characters long'});
    }
    const user = await getUserByEmail(email);
    res.status(200).json({ message: 'User logged in successfully'});
}

export const me = async (req: Request, res: Response) => {
    // const user = req.user;
    res.status(200).json({ message: 'User authenticated successfully'});
}