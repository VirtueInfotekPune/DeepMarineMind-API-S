import { Document, PaginateModel, Schema, model } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import paginate from "mongoose-paginate-v2";


export interface whitelistDocument extends Document {
    name: string;
    email: string;
    phone: string;
    comments : string;
    aboutCompany : string;
    approvalStatus : string;
    status: number;
}

const whitelistSchema = new Schema<whitelistDocument>({
    name: { type: String },
    email: { type: String , required : true },
    phone: { type: String  },
    comments : { type: String },
    aboutCompany : { type: String },
    approvalStatus : { type: String , enum : ["pending" , "approved" , "rejected"] , default : "pending" },
    status: { type: Number , enum : [0 , 1] , default : 1 },
},
{
    timestamps: true
})

whitelistSchema.plugin(paginate);
whitelistSchema.plugin(aggregatePaginate);

export const whitelistModel = model<whitelistDocument, PaginateModel<whitelistDocument>>("whitelist", whitelistSchema);