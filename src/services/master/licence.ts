import { infoLogger, errorLogger, dataLogger } from "../../core/logger";
import {licencesModel} from "../../models/master/licences";

interface LicencesService {
    saveLicence : (data : any) => Promise<any>;
    findOneLicence : (filter : any) => Promise<any>;
    findAllLicence : (filter : any) => Promise<any>;
    updateLicence : (filter : any , payload : any) => Promise<any>;
    deleteLicence : (filter : any) => Promise<any>;
    paginate : (filter : any , options : any) => Promise<any>;
}


const licencesService : LicencesService = {
    saveLicence :async (data : any) => {
        try{
            infoLogger("START:- saveLicence function in mongoose service");
            const result = await licencesModel.create(data);
            dataLogger("result of saveLicence", result);
            return result;
        }catch(error){
            errorLogger("error in saveLicence function in mongoose service", error);
            throw error;
        }
    },

    findOneLicence :async (filter : any) => {
        try{
            infoLogger("START:- findOneLicence function in mongoose service");
            const result = await licencesModel.findOne(filter);
            dataLogger("result of findOneLicence", result);
            return result;
        }catch(error){
            errorLogger("error in findOneLicence function in mongoose service", error);
            throw error;
        }
    },

    findAllLicence :async (filter : any) => {
        try{
            infoLogger("START:- findAllLicence function in mongoose service");
            const result = await licencesModel.find(filter);
            dataLogger("result of findAllLicence", result);
            return result;
        }catch(error){
            errorLogger("error in findAllLicence function in mongoose service", error);
            throw error;
        }
    },

    updateLicence :async (filter : any , payload : any) => {
        try{
            infoLogger("START:- updateLicence function in mongoose service");
            const result = await licencesModel.findOneAndUpdate(filter, payload);
            dataLogger("result of updateLicence", result);
            return result;
        }catch(error){
            errorLogger("error in updateLicence function in mongoose service", error);
            throw error;
        }
    },

    deleteLicence :async (filter : any) => {
        try{
            infoLogger("START:- deleteLicence function in mongoose service");
            const result = await licencesModel.findOneAndDelete(filter);
            dataLogger("result of deleteLicence", result);
            return result;
        }catch(error){
            errorLogger("error in deleteLicence function in mongoose service", error);
            throw error;
        }
    },

    paginate :async (filter : any , options : any) => {
        try{
            infoLogger("START:- paginate function in mongoose service");
            const result = await licencesModel.paginate(filter, options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in mongoose service", error);
            throw error;
        }
    },
}

export default licencesService;