import { Schema , model, Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface industryDocument extends Document{
    name : String,
    image : String

}

const industrySchema = new Schema<industryDocument>({
    name : {type : String , required : true},
    image : {type : String , required : true}
},
{
    timestamps : true
})

industrySchema.plugin(paginate);
industrySchema.plugin(aggregatePaginate);

export const industryModel = model<industryDocument, PaginateModel<industryDocument>>("industry", industrySchema)