import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/messages";


dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => {
        console.log("DB Connection Successful");
    })
    .catch((err) => {
        console.log(err.message);
    });

// Routes
app.get("/ping", (_req: Request, res: Response): void => {
    res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log(`Server started on ${PORT}`)
);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});


declare global {
    var onlineUsers: Map<string, string>;
    var chatSocket: any;
}

global.onlineUsers = new Map<string, string>();
global.chatSocket = null;

// Socket.io connection handling
io.on("connection", (socket): void => {
    global.chatSocket = socket;

    socket.on("add-user", (userId: string): void => {
        global.onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data: { to: string; msg: string }): void => {
        const sendUserSocket = global.onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
}); 