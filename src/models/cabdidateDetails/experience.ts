import { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

export interface experienceDocument extends Document {
    candidate: String,
    position: String,
    vesselType: String,
    vesselName: String,
    companyName: String,
    department: String,
    rank: String,
    cargoType: String,
    startDate: Date,
    endDate: Date,
    type: String,
    status : number ,
    totalDuration: String,
    expirence : String

}

const experienceSchema = new Schema<experienceDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "user" },
    vesselType: { type: String, },
    vesselName: { type: String, },
    position: { type: String, },
    companyName: { type: String, },
    department: { type: String, },
    rank: { type: String, },
    cargoType: { type: String, },
    startDate: { type: Date,  },
    endDate: { type: Date,  },
    type: { type: String, enum: ["onshore", "offshore"], default: "onshore" },
    totalDuration: { type: String, required: false },
    status : { type: Number, enum: [0, 1], default: 1 },
    expirence : {type : String}
},
    {
        timestamps: true
    })

// this calculation will handle from ffrontend side 

// Pre-save middleware to calculate total duration
// experienceSchema.pre("save", function (next) {
//     const experience = this;

//     if (experience.startDate && experience.endDate) {
//         const startDate = new Date(experience.startDate);
//         const endDate = new Date(experience.endDate);

//         // Calculate the total duration
//         const totalMonths =
//             (endDate.getFullYear() - startDate.getFullYear()) * 12 +
//             (endDate.getMonth() - startDate.getMonth());
//         const totalDays = endDate.getDate() - startDate.getDate();

//         let duration = `${totalMonths} Months`;
//         if (totalDays > 0) {
//             duration += ` & ${totalDays} Days`;
//         }

//         // Assign the calculated total duration
//         experience.totalDuration = duration;
//     }
//     else if (experience.totalDuration) {
//         experience.totalDuration = experience.totalDuration;
//     }

//     next();
// });

experienceSchema.plugin(paginate);
experienceSchema.plugin(aggregatePaginate);

export const experienceModel = model<experienceDocument, PaginateModel<experienceDocument>>("experience", experienceSchema)