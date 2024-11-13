import { Schema, model, Document } from "mongoose";

interface userDocument extends Document {
    name: string;
    email: string;
    phone?: string;
    password: string;
    type: string;
    role: string;
    status: number;
    emailOtp?: string;
    emailVerfied?: boolean;
}

const userSchema = new Schema<userDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    emailOtp: { type: String },
    emailVerfied: { type: Boolean, default: false },
    type: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});


userSchema.pre("save", function (next) {
    this.email = this.email.toLowerCase();
    next();
});



export default model<userDocument>("user", userSchema);