import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const getAuthenticatedUser = req.session.userId;


    try {
        if (!getAuthenticatedUser) {
            throw createHttpError(401, "User not authenticated");
        }
        const user = await UserModel.findById(getAuthenticatedUser).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


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


        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }

}

interface LoginBody {
    username: string;
    password: string;
}
export const login: RequestHandler = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            throw createHttpError(400, "All fields are required");
        }

        const user = await UserModel.findOne({ username:username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }
        req.session.userId = user._id;
        res.status(200).json(user);
}catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        }else{
            res.sendStatus(200);
        }
    })
}