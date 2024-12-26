import { dataLogger, errorLogger, infoLogger } from "../../core/logger";
import { candidateDocsModel } from "../../models/cabdidateDetails/candidateDocs";


interface CandidateDocsServices {
    save : (data : any, session?: any) => Promise<any>
    update : (filter : any , payload : any) => Promise<any>
    delete : (filter : any) => Promise<any>
    findOne : (filter : any) => Promise<any>
    findAll : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}


export const candidateDocsService : CandidateDocsServices = {
    save : async (data : any, session?: any) => {
       try{
        infoLogger("START:- save function in certificatesDocs service");
        const result = await candidateDocsModel.create(data,{session})
        dataLogger("result of save", result)
        return result
       }catch(error){
        errorLogger("error in save function in certificatesdocs service", error)
       }
    },

    update : async (filter : any , payload : any) => {
        try{
            infoLogger("START:- update function in certificatesDocs service");
            const result = await candidateDocsModel.updateOne(filter , payload);
            dataLogger("result of update", result);
            return result;
        }catch(error){
            errorLogger("error in update function in certificatesDocs service", error);
            throw error;
        }
    },

    delete : async (filter : any) => {
        try{
            infoLogger("START:- delete function in certificatesDocs service");
            const result = await candidateDocsModel.deleteOne(filter);
            dataLogger("result of delete", result);
            return result;
        }catch(error){
            errorLogger("error in delete function in certificatesDocs service", error);
            throw error;
        }
    },

    findOne : async (filter : any) => {
        try{
            infoLogger("START:- findOne function in certificatesDocs service");
            const result = await candidateDocsModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        }catch(error){
            errorLogger("error in findOne function in certificatesDocs service", error);
            throw error;
        }
    },

    findAll : async (filter : any) => {
        try{
            infoLogger("START:- findAll function in certificatesDocs service");
            const result = await candidateDocsModel.find(filter);
            dataLogger("result of findAll", result);
            return result;
        }catch(error){
            errorLogger("error in findAll function in certificatesDocs service", error);
            throw error;
        }
    },

    paginate : async (filter : any , options : any) => {
        try{
            infoLogger("START:- paginate function in certificatesDocs service");
            const result = await candidateDocsModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in certificatesDocs service", error);
            throw error;
        }
    }
}

export default candidateDocsService