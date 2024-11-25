import { infoLogger, dataLogger, errorLogger } from "../../core/logger";
import { industryModel } from "../../models/master/industry";

interface IndustryService {
    saveIndustry : (data : any) => Promise<any>
    findOneIndustry : (filter : any) => Promise<any>
    updateIndustry : (filter : any , payload : any) => Promise<any>
    deleteIndustry : (filter : any) => Promise<any>
    findAllIndustry : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}

const industryService : IndustryService = {
    saveIndustry : async (data : any) => {
        try {
            infoLogger("START:- saveIndustry function in mongoose service");
            const result = await industryModel.create(data);
            dataLogger("result of saveIndustry", result);
            return result;
        } catch (error) {
            errorLogger("error in saveIndustry function in mongoose service", error);
            throw error;
        }
    },

    findOneIndustry : async (filter : any) => {
        try {
            infoLogger("START:- findOneIndustry function in mongoose service");
            const result = await industryModel.findOne(filter);
            dataLogger("result of findOneIndustry", result);
            return result;
        } catch (error) {
            errorLogger("error in findOneIndustry function in mongoose service", error);
            throw error;
        }
    },

    updateIndustry : async (filter : any , payload : any) => {
        try {
            infoLogger("START:- updateIndustry function in mongoose service");
            const result = await industryModel.findOneAndUpdate(filter , payload);
            dataLogger("result of updateIndustry", result);
            return result;
        } catch (error) {
            errorLogger("error in updateIndustry function in mongoose service", error);
            throw error;
        }
    },

    deleteIndustry : async (filter : any) => {    
        try {
            infoLogger("START:- deleteIndustry function in mongoose service");
            const result = await industryModel.findOneAndDelete(filter);
            dataLogger("result of deleteIndustry", result);
            return result;
        } catch (error) {
            errorLogger("error in deleteIndustry function in mongoose service", error);
            throw error;
        }
    },

    findAllIndustry : async (filter : any) => {
        try {
            infoLogger("START:- findAllIndustry function in mongoose service");
            const result = await industryModel.find(filter);
            dataLogger("result of findAllIndustry", result);
            return result;
        } catch (error) {
            errorLogger("error in findAllIndustry function in mongoose service", error);
            throw error;
        }
    },

    paginate : async (filter : any , options : any) => {
        try {
            infoLogger("START:- paginate function in mongoose service");
            const result = await industryModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        } catch (error) {
            errorLogger("error in paginate function in mongoose service", error);
            throw error;
        }
    }
}

export default industryService;