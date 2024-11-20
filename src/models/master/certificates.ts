import {Schema, model, Document} from "mongoose";

interface certificatesDocuments extends Document {
    name : String,

}

const certificateSchema = new Schema<certificatesDocuments>({
    name : {type : String , required : true},
},
{
    timestamps : true
})

export default model<certificatesDocuments>("certificates", certificateSchema)