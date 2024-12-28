import {Schema, model , Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface licencesDocuments extends Document{
    name : String,
    rankId : String
}

const licencesSchema = new Schema<licencesDocuments>({
    name : {type : String , required : true},
    rankId : {type : Schema.Types.ObjectId , ref : "rank"}
},
{
    timestamps :  true
})

licencesSchema.plugin(paginate);
licencesSchema.plugin(aggregatePaginate);

export const licencesModel = model<licencesDocuments, PaginateModel<licencesDocuments>>("licences", licencesSchema)