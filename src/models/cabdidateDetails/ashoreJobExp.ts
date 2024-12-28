import {Schema, model, Document} from "mongoose";
import paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import {PaginateModel} from "../../interface/paginate";


interface ashoreJobExpDocument extends Document {
    candidate : String,
    positionName : String,
    companyName : String,
    experience : String,
}

const ashoreJobSchema = new Schema<ashoreJobExpDocument>({
    candidate : {type : Schema.Types.ObjectId , ref : "users"},
    positionName : {type : String , required : true},
    companyName : {type : String , required : true},
    experience : {type : String , required : true}
})

ashoreJobSchema.plugin(paginate);
ashoreJobSchema.plugin(aggregatePaginate);

export const ashoreJobModel = model<ashoreJobExpDocument, PaginateModel<ashoreJobExpDocument>>("ashoreJob", ashoreJobSchema)