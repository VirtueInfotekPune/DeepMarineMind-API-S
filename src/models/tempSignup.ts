import { Schema, model, Document } from "mongoose";
import { USER_TYPE } from "../constants/types/userType";
import { USER_ROLE } from "../constants/types/userRole";


export interface tempSignupDocument extends Document {
    name?: string
    email?: string
    emailOtp?: string
    emailVerified?: boolean
    otpExpiry?: Date
    phone?: string
    recruiter?: string
    payload?: string
    type?: string
    role?: string
    createdBy?: string
    right ? : {
        fleet: [{
            type: Schema.Types.ObjectId,
            ref: "fleet"
        }],
        can : [string]
    }
    status?: number
}

const tempSignupSchema = new Schema<tempSignupDocument>({
    name: { type: String },
    email: { type: String },
    emailOtp: { type: String },
    emailVerified: { type: Boolean, default: false },
    otpExpiry: { type: Date },
    phone: { type: String },
    recruiter: { type: Schema.Types.ObjectId, ref: "recruiter" },
    payload: { type: String },
    type: { type: String, enum: USER_TYPE },
    role: { type: String, enum: USER_ROLE },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    right: {
        fleet: [{
            type: Schema.Types.ObjectId,
            ref: "fleet"
        }],
        can: {
            type: [String], // Array of strings
            enum: ["read", "write", "create", "delete"], // Allowed values
            default: ["read"] // Default value
        }
    },
    status: { type: Number, enum: [0, 1], default: 1 },

}, {
    timestamps: true
});

export const TempSignupModel = model<tempSignupDocument>("tempSignup", tempSignupSchema);