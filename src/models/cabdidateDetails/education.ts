import {Schema, model, Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";


interface educationDocument extends Document {
    candidate : String,
    fieldOfStudy ?: String,
    degree ?: String,
    collage ?: String,
    startDate ?: Date,
    endDate ?: Date,
    marrkingSystem ?: String,
    result ?: String,
}

const educationSchema = new Schema<educationDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "user" },
    fieldOfStudy: { type: String },
    degree: { type: String },
    collage: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    marrkingSystem: { type: String },
    result: { type: String },
},
{
    timestamps: true
})

educationSchema.plugin(paginate);
educationSchema.plugin(aggregatePaginate);

export const educationModel = model<educationDocument, PaginateModel<educationDocument>>("candidate", educationSchema)