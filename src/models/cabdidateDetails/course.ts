import {Schema, model, Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import paginate from "mongoose-paginate-v2";
import aggregatePaginamete from "mongoose-aggregate-paginate-v2";

interface courseDocument extends Document {
    candidate : String,
    courseName : String,
    startDate : Date,
    endDate : Date,
    institutionName ?: String,
    status ?: Number
}

const courseSchema = new Schema<courseDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "users" , required : true },
    courseName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    institutionName: { type: String },
    status : { type: Number, enum: [0, 1], default: 1 },
},
{
    timestamps: true
})

courseSchema.plugin(paginate);
courseSchema.plugin(aggregatePaginamete);

export const courseModel = model<courseDocument, PaginateModel<courseDocument>>("courses", courseSchema)