import {Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";



interface rankDocument extends Document {
    name : String,
    image : String,
    departmentId : String
};

const rankSchema = new Schema<rankDocument>({
    name : {type : String , required : true},
    image : {type : String , required : true},
    departmentId : {type : Schema.Types.ObjectId , ref : "department"}
},
{
    timestamps : true
})

rankSchema.plugin(paginate);
rankSchema.plugin(aggregatePaginate);

export const rankModel = model<rankDocument, PaginateModel<rankDocument>>("rank" , rankSchema)

