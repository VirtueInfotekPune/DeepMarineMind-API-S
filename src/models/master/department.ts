import { timeStamp } from "console";
import {Schema, model, Document} from "mongoose";

interface departmentDocument extends Document{
    name : String,
    image : String,
    category ?: String
}

const departmentSchema = new Schema<departmentDocument>({
    name : {type : String, required : true},
    image : {type : String, required : true},
    category : {type : String}
},
{
    timestamps : true
})

export default model<departmentDocument>("department", departmentSchema)