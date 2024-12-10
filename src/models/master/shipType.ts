import {Schema , model, Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";


interface shipTypeDocument extends Document {
    name: String;
    vessel : String;
}

const shipTypeSchema = new Schema<shipTypeDocument>({
    name: { type: String, required: true },
    vessel : {type : Schema.Types.ObjectId , ref : "vessel"},
}, {
    timestamps: true
})

shipTypeSchema.plugin(paginate);
shipTypeSchema.plugin(aggregatePaginate);
export const shipTypeModel = model<shipTypeDocument, PaginateModel<shipTypeDocument>>("shipType",shipTypeSchema);