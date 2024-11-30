import {Schema, model, Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface certificatesDocuments extends Document {
    name : String,
    rankId : String

}

const certificateSchema = new Schema<certificatesDocuments>({
    name : {type : String , required : true},
    rankId : {type : Schema.Types.ObjectId , ref : "rank"}
},
{
    timestamps : true
})

certificateSchema.plugin(paginate);
certificateSchema.plugin(aggregatePaginate);

export const certificateModel = model<certificatesDocuments , PaginateModel<certificatesDocuments>>("certificates", certificateSchema)