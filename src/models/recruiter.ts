import { Schema, model, Document } from "mongoose";
import  paginate  from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

interface recruiterDocument extends Document {
    name : string,
    email : string,
    phone : string,
    organisationName : string,
    aboutCompany : string,
    image : string, 
    country : string,
    city : string,
    state : string,
    address1 : string,
    address2 : string,
    pincode : string,
    nearestAirport : string,
    socialLink: {
        linkedin: string,
        twitter: string,
        website: string,
        viber: string,
    },
    status : number

}

const recruiterSchema = new Schema<recruiterDocument>({
    name : {type : String},
    email : {type : String},
    phone : {type : String},
    organisationName : {type : String},
    aboutCompany : {type : String},
    image : {type : String},
    country : {type : String},
    city : {type : String},
    state : {type : String},
    address1 : {type : String},
    address2 : {type : String},
    pincode : {type : String},
    nearestAirport : {type : String},
    socialLink: {
        linkedin: { type: String },
        twitter: { type: String },
        website: { type: String },
        viber: { type: String },
    },
    status : {type : Number}
}, {
    timestamps: true
});



recruiterSchema.plugin(paginate);
recruiterSchema.plugin(aggregatePaginate);
export const RecruiterModel = model<recruiterDocument>("recruiter", recruiterSchema);
