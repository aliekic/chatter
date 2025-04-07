declare namespace Express {
    export interface Request {
        user?: any;
    }
}

declare global {
    var onlineUsers: Map<string, string>;
    var chatSocket: any;
}

interface MessageData {
    to: string;
    msg: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Message {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
} 