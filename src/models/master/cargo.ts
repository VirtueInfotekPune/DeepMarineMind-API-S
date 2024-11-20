import {Schema, model, Document} from "mongoose";

interface cargoDocument extends Document{
    name : String,

}

const cargoSchema = new Schema<cargoDocument>({
    name : {type : String , required : true},
},
{
    timestamps : true
})

export default model<cargoDocument>("cargo", cargoSchema)