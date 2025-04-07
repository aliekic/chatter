import { Request, Response, NextFunction } from "express";
import Messages from "../models/messageModel";

interface GetMessagesRequest extends Request {
    body: {
        from: string;
        to: string;
    };
}

interface AddMessageRequest extends Request {
    body: {
        from: string;
        to: string;
        message: string;
    };
}

export const getMessages = async (req: GetMessagesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { from, to } = req.body;

        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

export const addMessage = async (req: AddMessageRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) {
            res.json({ msg: "Message added successfully." });
        } else {
            res.json({ msg: "Failed to add message to the database" });
        }
    } catch (ex) {
        next(ex);
    }
}; 