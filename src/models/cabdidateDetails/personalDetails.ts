import { Document, PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface personalDocument extends Document {
    candidate: String,
    maritialStatus?: String,
    kin?: {
        nextOfKin?: String,
        kinName?: String,
        kinContact?: String,
        numberOfChildren?: String
        kinZip?: String
    }
    motherName?: String,

    fatherName?: String,
    plceOfBirth?: String,
    religion?: String,
    gender?: String,
    dateOfBirth?: Date,
    nationality?: String,
    identificationMark: String,
    weight?: String,
    height?: String,
    shooeSize?: String,
    overallSize?: String,
    eyeColor?: String,
    hairColor?: String,
    levelOfEnglish?: String,
    motherTunge?: String,
    otherLanguages?: String,
    yelloFever?: String,
    tetanus?: String,
    cholera?: String,
    hepatitisB?: String,
    typhoid?: String,
    covidVaccine?: String
}

const personalSchema = new Schema<personalDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "user", required: true },
    maritialStatus: { type: String },
    kin: {
        nextOfKin: { type: String },
        kinName: { type: String },
        kinContact: { type: String },
        numberOfChildren: { type: String },
        kinZip: { type: String }
    },
    motherName: { type: String },
    fatherName: { type: String },
    plceOfBirth: { type: String },
    religion: { type: String },
    gender: { type: String },
    dateOfBirth: { type: Date },
    nationality: { type: String },
    identificationMark: { type: String },
    weight: { type: String },
    height: { type: String },
    shooeSize: { type: String },
    overallSize: { type: String },
    eyeColor: { type: String },
    hairColor: { type: String },
    levelOfEnglish: { type: String },
    motherTunge: { type: String },
    otherLanguages: { type: String },
    yelloFever: { type: String },
    tetanus: { type: String },
    cholera: { type: String },
    hepatitisB: { type: String },
    typhoid: { type: String },
    covidVaccine: { type: String }
},
    {
        timestamps: true
    })

personalSchema.plugin(paginate);
personalSchema.plugin(aggregatePaginate);

export const personalDetailsModel = model<personalDocument, PaginateModel<personalDocument>>("personaldetails", personalSchema)