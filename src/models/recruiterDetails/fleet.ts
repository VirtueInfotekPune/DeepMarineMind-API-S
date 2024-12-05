import { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

interface fleetDocument extends Document {
    recruiter: string,
    industry: string
    vesselDetails: {
        vesselName: string,
        shipType: string,
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
    industry: { type: Schema.Types.ObjectId, ref: "industry" },
    vesselDetails: {
        vesselName: { type: String },
        shipType: { type: String },
        shipName: { type: String },
        flag: { type: String },
        engineType: {
            name: { type: String },
            visibility: { type: Boolean },
        },
        cargoType: {
            name: { type: String },
            visibility: { type: Boolean }
        },
        shipBuilt: {
            name: { type: String },
            visibility: { type: Boolean }
        },
        DWT: {
            name: { type: String },
            visibility: { type: Boolean }
        },
        GT: {
            name: { type: String },
            visibility: { type: Boolean }
        },
        imoNumber: {
            name: { type: String },
            visibility: { type: Boolean }
        }
    }
},
    {
        timestamps: true
    })


fleetSchema.plugin(paginate);
fleetSchema.plugin(aggregatePaginate);

export const fleetModel = model<fleetDocument, PaginateModel<fleetDocument>>("fleet", fleetSchema)