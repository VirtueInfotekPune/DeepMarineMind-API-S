import {Schema , model, Document} from "mongoose";
import { PaginateModel } from "../../interface/paginate";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";



interface activitiesDocument extends Document {
    candidate : String,
    activity : String,
}

const activitiesSchema = new Schema<activitiesDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "users" , required : true },
    activity: { type: String , required : true },
},
{
    timestamps: true
})

activitiesSchema.plugin(paginate);
activitiesSchema.plugin(aggregatePaginate);

export const activitiesModel = model<activitiesDocument, PaginateModel<activitiesDocument>>("activities", activitiesSchema)