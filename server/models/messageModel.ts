import mongoose, { Document, Schema } from "mongoose";

// Define the Message interface
export interface IMessage extends Document {
    message: {
        text: string;
    };
    users: string[];
    sender: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Message schema
const MessageSchema = new Schema<IMessage>(
    {
        message: {
            text: { type: String, required: true },
        },
        users: Array,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create and export the Message model
export default mongoose.model<IMessage>("Messages", MessageSchema); 