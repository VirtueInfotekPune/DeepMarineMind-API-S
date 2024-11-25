import { infoLogger, errorLogger, dataLogger } from "../../core/logger";
import { rankModel } from "../../models/master/rank";


interface RankService {
    saveRank: (data: any) => Promise<any>;
    findOneRank: (filter: any) => Promise<any>;
    updateRank: (filter: any, payload: any) => Promise<any>;
    deleteRank: (filter: any) => Promise<any>;
    findAllRank: (filter: any) => Promise<any>;
    paginate: (filter: any, options: any) => Promise<any>;
}

const rankService: RankService = {
    saveRank: async (data: any) => {
        try {
            infoLogger("START:- saveRank function in mongoose service");
            const result = await rankModel.create(data);
            dataLogger("result of saveRank", result);
            return result;
        } catch (error) {
            errorLogger("error in saveRank function in mongoose service", error);
            throw error;
        }
    },

    findOneRank: async (filter: any) => {
        try {
            infoLogger("START:- getRank function in mongoose service");
            const result = await rankModel.findOne(filter);
            dataLogger("result of getRank", result);
            return result;
        } catch (error) {
            errorLogger("error in getRank function in mongoose service", error);
            throw error;
        }
    },


    findAllRank: async (filter: any) => {
        try {
            infoLogger("START:- getAllRank function in mongoose service");
            const result = await rankModel.find(filter);
            dataLogger("result of getAllRank", result);
            return result;
        } catch (error) {
            errorLogger("error in getAllRank function in mongoose service", error);
            throw error;
        }
    },


    updateRank: async (filter: any, payload: any) => {
        try {
            infoLogger("START:- updateRank function in mongoose service");
            const result = await rankModel.findOneAndUpdate(filter, payload);
            dataLogger("result of updateRank", result);
            return result;
        } catch (error) {
            errorLogger("error in updateRank function in mongoose service", error);
            throw error;
        }
    },

    deleteRank: async (filter: any) => {
        try {
            infoLogger("START:- deleteRank function in mongoose service");
            const result = await rankModel.findOneAndDelete(filter);
            dataLogger("result of deleteRank", result);
            return result;
        } catch (error) {
            errorLogger("error in deleteRank function in mongoose service", error);
            throw error;
        }
    },


    paginate: async (filter: any, options: any) => {
        try {
            infoLogger("START:- paginate function in mongoose service");
            const result = await rankModel.paginate(filter, options);
            dataLogger("result of paginate", result);
            return result;
        } catch (error) {
            errorLogger("error in paginate function in mongoose service", error);
            throw error;
        }
    },

}

export default rankService;