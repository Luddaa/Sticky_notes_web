

import { Request, Response, NextFunction } from "express"
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
interface SignUpBody {
    username: string;
    email: string;
    password: string;
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;


    try {
        if (username && email && password) {
            throw new Error("Username, email and password are required");
        }

        const exitstingUser = await UserModel.findOne ({ username: username });
        if (exitstingUser) {
            throw new Error("User already exists");
        }


        const exitstingEmail = await UserModel.findOne ({ email: email });
        if (exitstingEmail) {
            throw new Error("Email already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: passwordHash
        
        });
res.status(201).json(newUser);
    }catch (error) {
        next(error);
    }
}