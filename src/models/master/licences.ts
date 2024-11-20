import {Schema, model , Document} from "mongoose";

interface licencesDocuments extends Document{
    name : String,
}

const licencesSchema = new Schema<licencesDocuments>({
    name : {type : String , required : true},
},
{
    timestamps :  true
})

export default model<licencesDocuments>("licences", licencesSchema)