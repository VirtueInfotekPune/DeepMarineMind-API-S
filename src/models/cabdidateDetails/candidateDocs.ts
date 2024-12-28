import { Schema, model, Document } from "mongoose"
import { PaginateModel } from "../../interface/paginate";
import paginate from "mongoose-paginate-v2";
import aggregatePaginamete from "mongoose-aggregate-paginate-v2";

interface candidateDocument extends Document {
    candidate : String,
    name: string,
    issuedFrom : string,
    issueDate: Date,
    expiryDate: Date,
    country: string,
    certificateNumber: string,
    certificateType: string,
    type: string,
    status: number

}

const candidateDocumentSchema = new Schema<candidateDocument>({

    candidate: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String, required: false },
    issuedFrom: { type: String, required: false },
    issueDate: { type: Date, required: false },
    expiryDate: { type: Date, required: false },
    country: { type: String, required: false },
    certificateNumber: { type: String, required: false },
    certificateType: { type: String, required: false },
    type: { type: String},
    status: { type: Number, enum: [0, 1], default: 1 },
  
}, {
    timestamps: true
})

candidateDocumentSchema.plugin(paginate);
candidateDocumentSchema.plugin(aggregatePaginamete);

export const candidateDocsModel = model<candidateDocument, PaginateModel<candidateDocument>>("documents", candidateDocumentSchema)
