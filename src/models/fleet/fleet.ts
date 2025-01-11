import { Schema, model, Document, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

interface fleetDocument extends Document {
    recruiter: Types.ObjectId,
    industry: Types.ObjectId
    industryName?: string,
    shipType : string,
    vesselDetails: {
        vesselName: string,
        shipType?: string,
        shipName: string,
        flag: string,
        engineType: {
            name: string,
            visibility: boolean,
        },
        cargoType: {
            name: string,
            visibility: boolean
        },
        shipBuilt: {
            name: string,
            visibility: boolean
        },
        DWT: {
            name: string,
            visibility: boolean
        },
        GT: {
            name: string,
            visibility: boolean
        },
        imoNumber: {
            name: string,
            visibility: boolean
        }
    },


}

const fleetSchema = new Schema({
    recruiter: { type: Schema.Types.ObjectId, ref: "recruiter" },
    industry: { type: Schema.Types.ObjectId, ref: "industry" , required: true },
    industryName: { type: String },
    vesselDetails: {
        vesselName: { type: String , required: true},
        shipType: { type: String },
        shipName: { type: String , required: true},
        flag: { type: String , required: true},
        engineType: {
            name: { type: String , required: true},
            visibility: { type:  Boolean, default : true },
        },
        cargoType: {
            name: { type: String , required: true},
            visibility: { type:  Boolean, default : true }
        },
        shipBuilt: {
            name: { type: String , required: true},
            visibility: { type:  Boolean, default : true }
        },
        DWT: {
            name: { type: String , required: true},
            visibility: { type:  Boolean, default : true }
        },
        GT: {
            name: { type: String , required: true},
            visibility: { type:  Boolean, default : true }
        },
        imoNumber: {
            name: { type: String , required: true},
            visibility: { type:  Boolean, default : true }
        }
    }
},
    {
        timestamps: true
    })


fleetSchema.plugin(paginate);
fleetSchema.plugin(aggregatePaginate);

export const fleetModel = model<fleetDocument, PaginateModel<fleetDocument>>("fleet", fleetSchema)