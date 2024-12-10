import {Schema ,model , Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";


interface awardsDocument extends Document {
    candidate : String
    awardName : String,
    institute : String
    date ?: Date
    
}

const awardSchema = new Schema<awardsDocument>({
    candidate : { type: Schema.Types.ObjectId, ref: "users" , required : true },
    awardName : { type: String , required : true },
    institute : { type: String , required : true },
    date : { type: Date },
},
{
    timestamps: true
})

awardSchema.plugin(paginate);
awardSchema.plugin(aggregatePaginate);

export const awardModel = model<awardsDocument, PaginateModel<awardsDocument>>("awards", awardSchema)