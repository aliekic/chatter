import mongoose, { Document, Schema } from "mongoose";

// Define the User interface
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAvatarImageSet: boolean;
    avatarImage: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
}, {
    timestamps: true
});

// Create and export the User model
export default mongoose.model<IUser>("Users", userSchema); 