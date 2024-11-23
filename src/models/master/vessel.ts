import { model, Schema, Document, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

// Extend mongoose-paginate-v2 type definitions for vesselDocument

export interface vesselDocument extends Document {
    name: String,
    image : String
    shipType : [{
        name : String,
    }]
}

const vesselSchema = new Schema<vesselDocument>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    shipType: [{ name: { type: String } }]
}, {
    timestamps: true
})

vesselSchema.plugin(paginate);
vesselSchema.plugin(aggregatePaginate);
export const vesselModel = model<vesselDocument, PaginateModel<vesselDocument>>("vessel",vesselSchema);