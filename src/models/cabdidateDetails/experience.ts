import { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

export interface experienceDocument extends Document {
    candidate: String,
    position: String,
    vesselType: String,
    vesselName: String,
    companyName: String,
    department: String,
    rank: String,
    cargoType: String,
    startDate: Date,
    endDate: Date,
    type: String,
    status : number ,
    totalDuration: String,
    expirence : String,
    flag : String

}

const experienceSchema = new Schema<experienceDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "users" },
    vesselType: { type: String, },
    vesselName: { type: String, },
    position: { type: String, },
    companyName: { type: String, },
    department: { type: String, },
    rank: { type: String, },
    cargoType: { type: String, },
    startDate: { type: Date,  },
    endDate: { type: Date,  },
    type: { type: String, enum: ["sea-exp", "moved-ashore"], default: "sea-exp" },
    totalDuration: { type: String, required: false },
    status : { type: Number, enum: [0, 1], default: 1 },
    expirence : {type : String},
    flag : {type : String}
},
    {
        timestamps: true
    })


experienceSchema.plugin(paginate);
experienceSchema.plugin(aggregatePaginate);

export const experienceModel = model<experienceDocument, PaginateModel<experienceDocument>>("experience", experienceSchema)