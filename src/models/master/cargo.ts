import {Schema, model, Document} from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

interface cargoDocument extends Document{
    name : String,

}

const cargoSchema = new Schema<cargoDocument>({
    name : {type : String , required : true},
},
{
    timestamps : true
})

cargoSchema.plugin(paginate);
cargoSchema.plugin(aggregatePaginate);

export const cargoModel = model<cargoDocument, PaginateModel<cargoDocument>>("cargo", cargoSchema)