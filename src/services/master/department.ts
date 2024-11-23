import { infoLogger, errorLogger, dataLogger } from "../../core/logger";
import {departmentModel} from "../../models/master/department";


interface DepartmentService {
    saveDepartment: (data: any) => Promise<any>;
    findOneDepartment: (filter: any) => Promise<any>;
    findAllDepartment: (filter: any) => Promise<any>;
    updateDepartment: (filter: any, payload: any) => Promise<any>;
    deleteDepartment: (filter: any) => Promise<any>;
    paginate: (filter: any, options: any) => Promise<any>;  

}

const departmentService: DepartmentService = {
    saveDepartment: async (data) => {
        try {
            infoLogger("START:- save function in department service");
            const result = await departmentModel.create(data);
            dataLogger("result of save", result);
            return result;
        } catch (error) {
            errorLogger("error in save function in department service", error);
            throw error;
        }
    },

    findOneDepartment : async (filter) => {
        try {
            infoLogger("START:- findOne function in department service");
            const result = await departmentModel.findOne(filter);
            dataLogger("result of findOne", result);
            return result;
        } catch (error) {
            errorLogger("error in findOne function in department service", error);
            throw error;
        }
    },


    findAllDepartment : async (filter) => {
        try {
            infoLogger("START:- findAll function in department service");
            const result = await departmentModel.find(filter);
            dataLogger("result of findAll", result);
            return result;
        } catch (error) {
            errorLogger("error in findAll function in department service", error);
            throw error;
        }
    },

    updateDepartment : async (filter , payload ) => {
        try {
            infoLogger("START:- update function in department service");
            const result = await departmentModel.findOneAndUpdate(filter , payload , {new : true});
            dataLogger("result of update", result);
            return result;
        } catch (error) {
            errorLogger("error in update function in department service", error);
            throw error;
        }
    },

    deleteDepartment : async (filter) => {
        try {
            infoLogger("START:- delete function in department service");
            const result = await departmentModel.findOneAndDelete(filter);
            dataLogger("result of delete", result);
            return result;
        } catch (error) {
            errorLogger("error in delete function in department service", error);
            throw error;
        }
    },

    paginate: async (filter: any, options: any) => {
        try {
            infoLogger("START:- paginate function in mongoose service");
            const result = await departmentModel.paginate(filter, options);
            dataLogger("result of paginate", result);
            return result;
        } catch (error) {
            errorLogger("error in paginate function in mongoose service", error);
            throw error;
        }
    },


}


export default  departmentService