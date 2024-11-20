import { Schema, model, Document } from "mongoose";
import { USER_TYPE } from "../constants/types/userType";
import { USER_ROLE } from "../constants/types/userRole";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
export interface userDocument extends Document {
    name: string;
    recruiter?: string;
    email: string;
    phone?: string;
    password: string;
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
    socialLink? : {
       linkedin?: string,
       twitter?: string,
       website?: string,
       viber?: string,
    }
    rights? : string
}

const userSchema = new Schema<userDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true},
    recruiter: { type: Schema.Types.ObjectId  , ref: "recruiter" },
    phone: { type: String },
    password: { type: String },
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
    socialLink: {
        linkedin: { type: String },
        twitter: { type: String },
        website: { type: String },
        viber: { type: String },
    },
    rights : { type: String },
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