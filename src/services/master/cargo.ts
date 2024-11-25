import { infoLogger, errorLogger, dataLogger } from "../../core/logger";
import { cargoModel } from "../../models/master/cargo";


interface CargoService {
    saveCargo : (data :any) => Promise<any>
    findOneCargo : (filter : any) => Promise<any>
    updateCargo : (filter : any , payload : any) => Promise<any>
    deleteCargo : (filter : any) => Promise<any>
    findAllCargo : (filter : any) => Promise<any>
    paginate : (filter : any , options : any) => Promise<any>
}


const cargoService : CargoService = {
    saveCargo : async (data : any) => {
        try {
            infoLogger("START:- saveCargo function in mongoose service");
            const result = await cargoModel.create(data);
            dataLogger("result of saveCargo", result);
            return result;
        } catch (error) {
            errorLogger("error in saveCargo function in mongoose service", error);
            throw error;
        }
    },
    findOneCargo : async (filter : any) => {
        try {
            infoLogger("START:- findOneCargo function in mongoose service");
            const result = await cargoModel.findOne(filter);
            dataLogger("result of findOneCargo", result);
            return result;
        } catch (error) {
            errorLogger("error in findOneCargo function in mongoose service", error);
            throw error;
        }
    },
    findAllCargo : async (filter : any) => {
        try {
            infoLogger("START:- findAllCargo function in mongoose service");
            const result = await cargoModel.find(filter);
            dataLogger("result of findAllCargo", result);
            return result;
        } catch (error) {
            errorLogger("error in findAllCargo function in mongoose service", error);
            throw error;
        }
    },


    updateCargo : async (filter : any , payload : any) => {
        try {
            infoLogger("START:- updateCargo function in mongoose service");
            const result = await cargoModel.findOneAndUpdate(filter , payload , {new : true});
            dataLogger("result of updateCargo", result);
            return result;
        } catch (error) {
            errorLogger("error in updateCargo function in mongoose service", error);
            throw error;
        }
    },
    deleteCargo : async (filter : any) => {
        try {
            infoLogger("START:- deleteCargo function in mongoose service");
            const result = await cargoModel.findOneAndDelete(filter);
            dataLogger("result of deleteCargo", result);
            return result;
        } catch (error) {
            errorLogger("error in deleteCargo function in mongoose service", error);
            throw error;
        }
    },

    
    paginate : async (filter : any , options : any) => {
        try {    
            infoLogger("START:- paginate function in mongoose service");
            const result = await cargoModel.paginate(filter , options);
            dataLogger("result of paginate", result);
            return result;
        } catch (error) {
            errorLogger("error in paginate function in mongoose service", error);
            throw error;
        }
    }

}


export default cargoService;