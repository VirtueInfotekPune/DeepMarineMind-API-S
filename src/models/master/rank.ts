import {Schema, model, Document } from "mongoose";


interface rankDocument extends Document {
    name : String,
    image : String,
    department : String
};

const rankSchema = new Schema<rankDocument>({
    name : {type : String , required : true},
    image : {type : String , required : true},
    department : {type : Schema.Types.ObjectId , ref : "department"}
},
{
    timestamps : true
})

export default model<rankDocument>("rank" , rankSchema)

