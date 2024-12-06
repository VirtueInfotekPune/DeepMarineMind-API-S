import { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { PaginateModel } from "../../interface/paginate";

interface experienceDocument extends Document {
    candidate: String,
    vesselType: String,
    vesselName: String,
    companyName: String,
    department: String,
    rank: String,
    cargoType: String,
    startDate: Date,
    endDate: Date,
    totalDuration: String,


    // this is for the tesing purpose 


    // this is second commit 

}

const experienceSchema = new Schema<experienceDocument>({
    candidate: { type: Schema.Types.ObjectId, ref: "user" },
    vesselType: { type: String, required: true },
    vesselName: { type: String, required: true },
    companyName: { type: String, required: true },
    department: { type: String, required: true },
    rank: { type: String, required: true },
    cargoType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDuration: { type: String, required: false },
},
    {
        timestamps: true
    })


    // Pre-save middleware to calculate total duration
experienceSchema.pre("save", function (next) {
    const experience = this;

    if (experience.startDate && experience.endDate) {
        const startDate = new Date(experience.startDate);
        const endDate = new Date(experience.endDate);

        // Calculate the total duration
        const totalMonths =
            (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());
        const totalDays = endDate.getDate() - startDate.getDate();

        let duration = `${totalMonths} Months`;
        if (totalDays > 0) {
            duration += ` & ${totalDays} Days`;
        }

        // Assign the calculated total duration
        experience.totalDuration = duration;
    }

    next();
});

experienceSchema.plugin(paginate);
experienceSchema.plugin(aggregatePaginate);

export const experienceModel = model<experienceDocument, PaginateModel<experienceDocument>>("experience", experienceSchema)