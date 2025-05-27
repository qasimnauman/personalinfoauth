import mongoose, { Schema } from "mongoose";

const personalInfoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    address: {
        type: String,
    },
    phone: {
        type: String
    }
}, { timestamps: true });

export const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);