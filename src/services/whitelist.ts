import { FilterQuery, PaginateOptions } from "mongoose";
import { infoLogger, errorLogger , dataLogger } from "../core/logger";
import { whitelistModel , whitelistDocument } from "../models/whitelist";

export const whitelistService = {
    save : async (data : whitelistDocument) => {
        try{
            infoLogger("START:- save function in whitelist service");
            const result = await whitelistModel.create(data);
            dataLogger("result of save", result);
            return result;
        }catch(error){
            errorLogger("error in save function in whitelist service", error);
            throw error;
        }
    },

    paginate : async (filter : FilterQuery<whitelistDocument> , options : PaginateOptions) => {
        try{
            infoLogger("START:- paginate function in whitelist service");
            const result = await whitelistModel.paginate(filter, options);
            dataLogger("result of paginate", result);
            return result;
        }catch(error){
            errorLogger("error in paginate function in whitelist service", error);
            throw error;
        }
    },

    findOne : async (filter : FilterQuery<whitelistDocument>) => {
        try{
            infoLogger("START:- findOne function in whitelist service");
            const result = await whitelistModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        }catch(error){
            errorLogger("error in findOne function in whitelist service", error);
            throw error;
        }
    },

    update : async (filter : FilterQuery<whitelistDocument> , payload : whitelistDocument) => {
        try{
            infoLogger("START:- update function in whitelist service");
            const result = await whitelistModel.findOneAndUpdate(filter, payload);
            dataLogger("result of update", result);
            return result;
        }catch(error){
            errorLogger("error in update function in whitelist service", error);
            throw error;
        }
    },

    delete : async (filter : FilterQuery<whitelistDocument>) => {
        try{
            infoLogger("START:- delete function in whitelist service");
            const result = await whitelistModel.findOneAndDelete(filter);
            dataLogger("result of delete", result);
            return result;
        }catch(error){
            errorLogger("error in delete function in whitelist service", error);
            throw error;
        }
    }

}

export default whitelistService