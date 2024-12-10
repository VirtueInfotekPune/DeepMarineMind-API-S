import { Document, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

interface departmentDocument extends Document{
    name : String,
    image : String,
    shiptype? : {type : Schema.Types.ObjectId , ref : "vessel"}
   
}

const departmentSchema = new Schema<departmentDocument>({
    name : {type : String, required : true},
    image : {type : String, required : true},
    shiptype : {type : Schema.Types.ObjectId , ref : "shipType"}
},
{
    timestamps : true
})

departmentSchema.plugin(paginate);
departmentSchema.plugin(aggregatePaginate);

export const departmentModel =  model<departmentDocument ,PaginateModel<departmentDocument> >("department", departmentSchema)
