import { successResponse, catchResponse, failureResponse } from "../../../core/response";
import { dataLogger, errorLogger, infoLogger } from "../../../core/logger";
import experienceService from "../../../services/candidateDetails/experience";
import { UserModel } from "../../../models/user";
import { USER_TYPE } from "../../../constants/types/userType";
import personalDetailsService from "../../../services/candidateDetails/personalDetails";
import candidateDocsService from "../../../services/candidateDetails/candidateDocs";
import { startSession } from "mongoose";

// it is working experience for candidate 

// export const handleUploadCVCandidate = async (req: any, res: any) => {
//     try {
//         if (req.user.type !== USER_TYPE.CANDIDATE) {
//             const response = failureResponse({
//                 handler: "personalDetails",
//                 messageCode: "E046",
//                 req: req,
//             });
//             return res.status(response.statusCode).send(response);
//         }

//         const { sea_experience } = req.body;

//         if (!sea_experience || !Array.isArray(sea_experience)) {
//             const response = failureResponse({
//                 handler: "personalDetails",
//                 messageCode: "E049",
//                 req: req,

//             });
//             return res.status(response.statusCode).send(response);
//         }

//         const experiences = sea_experience.map((exp: any) => ({
//             candidate: req.user._id, // Extracted from token
//             vesselType: exp.vessel_type || "",
//             vesselName: exp.vessel_name || "",
//             position: exp.rank || "",
//             companyName: exp.crewing_agency_and_owner || "",
//             startDate: new Date(exp.date_from.split("/").reverse().join("-")),
//             endDate: new Date(exp.date_to.split("/").reverse().join("-")),
//             cargoType: exp.cargo_type || "",
//             rank: exp.rank || "",
//             totalDuration: exp.days || "",
//             type: "onshore", // Example default value
//             status: 1, // Default active status
//         }));

//         const result = await experienceModel.insertMany(experiences);

//         const response = successResponse({
//             handler: "personalDetails",
//             messageCode: "S022",
//             req: req,
//             data: result,
//         });
//         return res.status(response.statusCode).send(response);
//     } catch (error) {
//         errorLogger("Error in handleUploadCVCandidate", error);
//         const response = failureResponse({
//             handler: "personalDetails",
//             messageCode: "E050",
//             req: req,

//         });
//         return res.status(response.statusCode).send(response);
//     }
// };





// export const handleUploadCVCandidate = async (req: any, res: any) => {
//     try {
//         if (req.user.type !== USER_TYPE.CANDIDATE) {
//             const response = failureResponse({
//                 handler: "personalDetails",
//                 messageCode: "E046",
//                 req: req,
//             });
//             return res.status(response.statusCode).send(response);
//         }

//         const { sea_experience, general_purpose_info } = req.body;

//         let generalPurposeInfoData = {} as any
//         if (general_purpose_info) {

//             if (general_purpose_info.application || general_purpose_info.next_of_kin) {

//                 let kinPayload = {} as any

//                 if (general_purpose_info.next_of_kin) {
//                     kinPayload = {

//                         maritialStatus: general_purpose_info?.next_of_kin?.marital_status,
//                         kin: {
//                             nextOfKin: general_purpose_info?.next_of_kin?.kin_relation,
//                             kinName: `${general_purpose_info?.next_of_kin?.kin_forename} ${general_purpose_info?.next_of_kin?.kin_surname}`, // Combines forename and surname for kinName
//                             kinContact: general_purpose_info?.next_of_kin?.kin_telephone,
//                             numberOfChildren: general_purpose_info?.next_of_kin?.number_of_children,
//                         },
//                     };
//                 }
//                 const payload = {
//                     ...general_purpose_info.application,
//                     candidate: req.user._id,
//                     dateOfBirth: parseDate(general_purpose_info?.application?.date_of_birth),
//                     plceOfBirth: general_purpose_info?.application?.birth_place
//                 }
//                 const result = await personalDetailsService.save(payload);
//                 generalPurposeInfoData.personalDetails = result;
//             }

//         }
//         // Combine both results into a single response
//         const response = successResponse({
//             handler: "personalDetails",
//             messageCode: "S022",
//             req: req,
//             data: {


//             },
//         });
//         return res.status(response.statusCode).send(response);
//     } catch (error) {
//         errorLogger("Error in handleUploadCVCandidate", error);
//         const response = failureResponse({
//             handler: "personalDetails",
//             messageCode: "E064",
//             req: req,
//         });
//         return res.status(response.statusCode).send(response);
//     }
// };

// if (general_purpose_info.address) {
//     const { email, ...rest } = general_purpose_info.address
//     const payload = {
//         ...rest,
//         nearestAirport: general_purpose_info?.address?.nearest_airport,
//         address1: general_purpose_info?.address?.address,
//         phone: general_purpose_info?.address?.mobile,
//         pincode: general_purpose_info?.address?.zip,
//     }


// }




function convertToDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
}

export const handleUploadCVCandidate = async (req: any, res: any) => {
    const session = await startSession();

    try {
        if (req.user.type !== USER_TYPE.CANDIDATE) {
            const response = failureResponse({
                handler: "personalDetails",
                messageCode: "E046",
                req: req,
            });
            return res.status(response.statusCode).send(response);
        }

        const { general_purpose_info, sea_experience } = req.body;

        // Prepare data for the personal details service
        const dataToSave = {
            candidate: req.user._id,
            maritialStatus: general_purpose_info?.next_of_kin?.marital_status,
            // family details 
            kin: {
                nextOfKin: general_purpose_info?.next_of_kin?.kin_relation,
                kinName: `${general_purpose_info?.next_of_kin?.kin_forename} ${general_purpose_info?.next_of_kin?.kin_surname}`,
                kinContact: general_purpose_info?.next_of_kin?.kin_telephone,
                numberOfChildren: general_purpose_info?.next_of_kin?.number_of_children,
                kinZip: general_purpose_info?.next_of_kin?.kin_zip,
            },

            // Application details
            dateOfBirth: convertToDate(general_purpose_info?.application?.date_of_birth),
            plceOfBirth: general_purpose_info?.application?.birth_place,
            nationality: general_purpose_info?.application?.nationality,

            // Rank is availble in the candidate experience model 
            // rank: general_purpose_info?.application?.rank,

            otherLanguages: general_purpose_info?.languages?.other_languages,
            motherTunge: general_purpose_info?.languages?.mother_tongue,
            levelOfEnglish: general_purpose_info?.languages?.level_of_english,
            eyeColor: general_purpose_info?.measures?.colour_of_eyes,
            hairColor: general_purpose_info?.measures?.colour_of_hairs,
            height: general_purpose_info?.measures?.height,
            weight: general_purpose_info?.measures?.weight,
            overallSize: general_purpose_info?.measures?.overall,
            shooeSize: general_purpose_info?.measures?.safety_shoes_size,
            yelloFever: general_purpose_info?.vaccinations?.yellow_fever,
            tetanus: general_purpose_info?.vaccinations?.tetanus,
            cholera: general_purpose_info?.vaccinations?.cholera,
            hepatitisB: general_purpose_info?.vaccinations?.hepatitis_b,
            typhoid: general_purpose_info?.vaccinations?.typhoid,
            covidVaccine: general_purpose_info?.vaccinations?.covid_vaccine,
        };

        // Prepare sea experience data
        const experienceDataToSave = sea_experience.map((experience: any) => ({
            candidate: req.user._id,
            vesselType: experience.vessel_type,
            vesselName: experience.vessel_name,
            position: experience.rank,
            companyName: experience.crewing_agency_and_owner,
            department: "",
            rank: experience.rank,
            startDate: convertToDate(experience.date_from),
            endDate: convertToDate(experience.date_to),
            // rank: general_purpose_info?.application?.rank,
            cargoType: "",
            type: "sea-exp",
            totalDuration: experience.days,
            status: 1,
            expirence: experience.vessel_name,
        }));

        // Extract address data
        const addressData = {
            address1: general_purpose_info?.address?.address,
            phone: general_purpose_info?.address?.mobile,
            pincode: general_purpose_info?.address?.zip,
            nearestAirport: general_purpose_info?.address?.nearest_airport,
            whatsapp: general_purpose_info?.address?.whatsapp,
            city: general_purpose_info?.address?.city,
            country: general_purpose_info?.address?.country,
            state: "",

        };


        // candidate all documents details 
        const visas = general_purpose_info?.visas || [];
        const passports = general_purpose_info?.passports || [];
        const nationalDocuments = general_purpose_info?.national_documents || {};
        // visas 
        const visaDocuments = visas.map((visa: any) => ({
            candidate: req.user._id,
            name: visa.visa_description,
            expiryDate: convertToDate(visa.visa_expiry_date),
            issuedFrom: visa.visa_issued,
            certificateNumber: visa.visa_number,
            country: visa.visa_country,
            certificateType: "visa",
        }));

        // Process passports
        const passportDocuments = passports.map((passport: any) => ({
            candidate: req.user._id,
            name: "passport",
            expiryDate: convertToDate(passport.passport_expiry_date),
            issuedFrom: passport.passport_country,
            certificateNumber: passport.passport_number,
            country: passport.passport_country,
            certificateType: "passport",
        }));
        // national docs 
        const nationalDocumentKeys = Object.keys(nationalDocuments);
        const nationalDocumentArray = nationalDocumentKeys.map((key) => {
            const doc = nationalDocuments[key];
            return {
                candidate: req.user._id,
                name: key,
                expiryDate: convertToDate(doc.expiry_date),
                issueDate: convertToDate(doc.date_issued),
                certificateNumber: doc.number_and_rank_according_stcw,
                country: doc.country,
                certificateType: "license",
            };
        });


        // Combine all documents
        const candidateDocuments = [
            ...visaDocuments,
            ...passportDocuments,
            ...nationalDocumentArray,
        ];

        // Start the transaction
        session.startTransaction();


        const personalDetailsResult = await personalDetailsService.save([dataToSave], session);
        const experienceResult = await experienceService.save(experienceDataToSave, session);
        const candidateDocumentsResult = await candidateDocsService.save(candidateDocuments, session);
        const userUpdateResult = await UserModel.updateOne(
            { _id: req.user._id },
            { $set: addressData },
            { session }
        );
        // Commit the transaction if everything is successful
        await session.commitTransaction();

        // Send success response
        const response = successResponse({
            handler: "personalDetails",
            messageCode: "S022",
            req: req,
            data: {
                personalDetailsResult,
                experienceResult,
                userUpdateResult,
                candidateDocumentsResult
            },
        });
        return res.status(response.statusCode).send(response);

    } catch (error) {
        
        await session.abortTransaction();

        errorLogger("Error in handleUploadCVCandidate", error);
        const response = failureResponse({
            handler: "personalDetails",
            messageCode: "E064",
            req: req,
        });
        return res.status(response.statusCode).send(response);

    } finally {
        // End the session after the transaction
        session.endSession();
    }
};

