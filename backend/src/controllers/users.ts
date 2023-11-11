import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";


interface SignUpBody {
    username: string;
    email: string;
    password: string;
}

export const signUp: RequestHandler = async (req, res, next) => {
    const { username, email, password } = req.body as SignUpBody;

    try {
        if (!username || !email || !password) {
            throw createHttpError(400, "All fields are required");
        }
        const exisitingUser = await UserModel.findOne({ email }).exec();

        if (exisitingUser) {
            throw createHttpError(409, "username already taken");
        }
        const exisitingEmail = await UserModel.findOne({ email }).exec();
        if (exisitingEmail) {
            throw createHttpError(409, "email already taken");
        }
        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username:username,
            email: email,
            password: passwordHashed,
        });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }

}