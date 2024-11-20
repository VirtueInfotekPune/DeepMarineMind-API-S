import { model, Schema , Document } from "mongoose";

export interface vesselDocument extends Document {
    name : String,
    image : String,
    shipType : [{
        name : String,
        image : String
    }]
}

const vesselSchema =  new Schema<vesselDocument>({
    name : {type : String , required : true},
    image : {type : String , required : true},
    shipType : [{
        name : {type : String , required : true},
        image : {type : String , required : true}
    }]
},
{
    timestamps : true
})

export default model<vesselDocument>("vessel", vesselSchema);