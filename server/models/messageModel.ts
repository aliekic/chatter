import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    message: {
        text: string;
    };
    users: string[];
    sender: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

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

export default mongoose.model<IMessage>("Messages", MessageSchema); 