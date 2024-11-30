import { Document, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

interface departmentDocument extends Document{
    name : String,
    image : String,
    vesselId? : {type : Schema.Types.ObjectId , ref : "vessel"}
    // rank?:[{
    //     name : String
    // }]

}

const departmentSchema = new Schema<departmentDocument>({
    name : {type : String, required : true},
    image : {type : String, required : true},
    // rank : [{name : {type : String}}],
    vesselId : {type : Schema.Types.ObjectId , ref : "vessel"}
},
{
    timestamps : true
})

departmentSchema.plugin(paginate);
departmentSchema.plugin(aggregatePaginate);

export const departmentModel =  model<departmentDocument ,PaginateModel<departmentDocument> >("department", departmentSchema)
