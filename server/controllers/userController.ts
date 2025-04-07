import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

interface LoginRequest extends Request {
    body: {
        username: string;
        password: string;
    };
}

interface RegisterRequest extends Request {
    body: {
        username: string;
        email: string;
        password: string;
    };
}

interface SetAvatarRequest extends Request {
    params: {
        id: string;
    };
    body: {
        image: string;
    };
}

interface LogoutRequest extends Request {
    params: {
        id: string;
    };
}

interface GetAllUsersRequest extends Request {
    params: {
        id: string;
    };
}

export const login = async (req: LoginRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.json({ msg: "Incorrect Username or Password", status: false });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.json({ msg: "Incorrect Username or Password", status: false });
            return;
        }
        const userWithoutPassword = { ...user.toObject() };
        (userWithoutPassword as any).password = undefined;
        res.json({ status: true, user: userWithoutPassword });
    } catch (ex) {
        next(ex);
    }
};

export const register = async (req: RegisterRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            res.json({ msg: "Username already used", status: false });
            return;
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            res.json({ msg: "Email already used", status: false });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        const userWithoutPassword = { ...user.toObject() };
        (userWithoutPassword as any).password = undefined;
        res.json({ status: true, user: userWithoutPassword });
    } catch (ex) {
        next(ex);
    }
};

export const getAllUsers = async (req: GetAllUsersRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        res.json(users);
    } catch (ex) {
        next(ex);
    }
};

export const setAvatar = async (req: SetAvatarRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        if (userData) {
            res.json({
                isSet: userData.isAvatarImageSet,
                image: userData.avatarImage,
            });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (ex) {
        next(ex);
    }
};

export const logOut = (req: LogoutRequest, res: Response, next: NextFunction): void => {
    try {
        if (!req.params.id) {
            res.json({ msg: "User id is required " });
            return;
        }
        global.onlineUsers.delete(req.params.id);
        res.status(200).send();
    } catch (ex) {
        next(ex);
    }
}; 