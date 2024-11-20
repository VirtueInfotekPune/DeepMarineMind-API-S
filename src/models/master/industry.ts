import { Schema , model, Document} from "mongoose";

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

export default model<industryDocument>("industry", industrySchema)