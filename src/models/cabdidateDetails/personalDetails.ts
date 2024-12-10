import { Document, Schema , model} from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

interface personalDocument extends Document {
    candidate : String,
    maritialStatus ?: String,
    nextOfKin ?: String,
    kinName ?: String,
    kinContact ?: String,
    children ?: String,
    motherName ?: String,
    fatherName ?: String,
    plceOfBirth ?: String,
    religion ?: String,
    gender ?: String,
    dateOfBirth ?: Date,
    identificationMark : String,
    weight ?: String,
    height ?: String,
    shooeSize ?: String,
    overallSize ?: String,
    eyeColor ?: String,
    hairColor ?: String,
}

const personalSchema = new Schema<personalDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "users"  , required : true },
    maritialStatus: { type: String },
    nextOfKin: { type: String },
    kinName: { type: String },
    kinContact: { type: String },
    children: { type: String },
    motherName: { type: String },
    fatherName: { type: String },
    plceOfBirth: { type: String },
    religion: { type: String },
    gender: { type: String },
    dateOfBirth: { type: Date },
    identificationMark: { type: String },
    weight: { type: String },
    height: { type: String },
    shooeSize: { type: String },
    overallSize: { type: String },
    eyeColor: { type: String },
    hairColor: { type: String },
},
{
    timestamps: true
})

personalSchema.plugin(paginate);
personalSchema.plugin(aggregatePaginate);

export const personalDetailsModel = model<personalDocument, PaginateModel<personalDocument>>("personaldetails",personalSchema)