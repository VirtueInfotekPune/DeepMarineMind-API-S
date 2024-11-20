import { Schema, model, Document } from "mongoose";
import { USER_TYPE } from "../constants/types/userType";
import { USER_ROLE } from "../constants/types/userRole";


interface tempSignupDocument extends Document {
    name?: string 
    email?: string 
    emailOtp?: string 
    emailVerified?: boolean
    otpExpiry?: Date 
    phone?: string
    payload?: string 
    type?: string 
    role?: string 
    status?: number
}

const tempSignupSchema = new Schema<tempSignupDocument>({
    name: { type: String },
    email: { type: String },
    emailOtp: { type: String },
    emailVerified: { type: Boolean, default: false },
    otpExpiry: { type: Date },
    phone: { type: String },
    payload: { type: String },
    type: { type: String, enum : USER_TYPE },
    role: { type: String , enum : USER_ROLE},
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});

export const TempSignupModel = model<tempSignupDocument>("tempSignup", tempSignupSchema);