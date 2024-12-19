import { Schema, model, Document } from "mongoose";
import { USER_TYPE } from "../constants/types/userType";
import { USER_ROLE } from "../constants/types/userRole";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
export interface userDocument extends Document {
    name?: string;
    recruiter?: string;
    email: string;
    phone?: string;
    password: string;
    firstTimePasswordChange?: boolean;
    type: string;
    role?: string;
    status: number;
    industry?: string
    bio?: string
    image?: string
    country?: string
    city?: string
    state?: string
    address1?: string
    address2?: string
    pincode?: string
    nearestAirport?: string
    phoneVerified?: boolean
    socialLink? : {
       linkedin?: string,
       twitter?: string,
       website?: string,
       viber?: string,
    }
    right ? : {
        fleet: [{
            type: Schema.Types.ObjectId,
            ref: "fleet"
        }],
        can : [string]
    }
}

const userSchema = new Schema<userDocument>({
    name: { type: String},
    email: { type: String, required: true},
    recruiter: { type: Schema.Types.ObjectId  , ref: "recruiter" },
    phone: { type: String },
    password: { type: String },
    firstTimePasswordChange: { type: Boolean, default: true },
    type: { type: String, required: true , enum : USER_TYPE },
    role: { type: String , enum : USER_ROLE},
    industry: { type: Schema.Types.ObjectId, ref: "industry" },
    bio : { type: String },
    image : { type: String },
    country : { type: String },
    city : { type: String },
    state : { type: String },
    address1 : { type: String },
    address2 : { type: String },
    pincode : { type: String },
    nearestAirport : { type: String },
    phoneVerified : { type: Boolean, default: false },
    socialLink: {
        linkedin: { type: String },
        twitter: { type: String },
        website: { type: String },
        viber: { type: String },
    },
    right: {
        fleet: [{
            type: Schema.Types.ObjectId,
            ref: "fleet"
        }],
        can: {
            type: [String], 
            enum: ["read", "write", "create", "delete"], 
            default: ["read"] 
        }
    },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});


userSchema.pre("save", function (next) {
    this.email = this.email.toLowerCase();
    next();
});

userSchema.plugin(paginate);
userSchema.plugin(aggregatePaginate);



export const UserModel = model<userDocument>("user", userSchema);