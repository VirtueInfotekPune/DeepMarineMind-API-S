import { infoLogger, errorLogger , dataLogger } from "../core/logger";


interface MongooseService {
    save: (model: any, data: any) => Promise<any>;
    update: (model: any, filter: any, payload: any, options: any) => Promise<any>;
    delete : (model: any , filter : any) => Promise<any>;
    findOne : (model: any , filter: any) => Promise<any>;
    findAll : (model: any , filter: any) => Promise<any>;
    paginate : (model: any , filter: any) => Promise<any>;
    aggregatePaginate : (model: any , filter: any) => Promise<any>;
  }
  
const mongooseService: MongooseService = {
    save: async (model, data) => {
      try {
        infoLogger("START:- save function in mongoose service");
        const result = await model.create(data);
        dataLogger("result of save", result);
        return result;
      } catch (error) {
        errorLogger("error in save function in mongoose service", error);
        throw error;
      }
    },

    update: async (model, filter , payload , options ) => {
      try {
        infoLogger("START:- update function in mongoose service");
        const result = await model.findOneAndUpdate(filter , payload , {new : true , ...options});
        dataLogger("result of update", result);
        return result;
      } catch (error) {
        errorLogger("error in update function in mongoose service", error);
        throw error;
      }
    },

    delete : async (model , filter) => {
      try {
        infoLogger("START:- delete function in mongoose service");
        const result = await model.findOneAndDelete(filter);
        dataLogger("result of delete", result);
        return result;
      } catch (error) {
        errorLogger("error in delete function in mongoose service", error);
        throw error;
      }
    },

    findOne : async (model , filter) => {
      try {
        infoLogger("START:- findOne function in mongoose service");
        const result = await model.findOne(filter);
        dataLogger("result of findOne", result);
        return result;
      } catch (error) {
        errorLogger("error in findOne function in mongoose service", error);
        throw error;
      }
    },

    findAll : async (model , filter) => {
      try {
        infoLogger("START:- findAll function in mongoose service");
        const result = await model.find(filter);
        dataLogger("result of findAll", result);
        return result;
      } catch (error) {
        errorLogger("error in findAll function in mongoose service", error);
        throw error;
      }
    },
    paginate : async (model , filter) => {
      try {
        infoLogger("START:- paginate function in mongoose service");
        const result = await model.paginate(filter);
        dataLogger("result of paginate", result);
        return result;
      } catch (error) {
        errorLogger("error in paginate function in mongoose service", error);
        throw error;
      }
    },

    aggregatePaginate : async (model , filter) => {
      try {
        infoLogger("START:- aggregatePaginate function in mongoose service");
        const result = await model.aggregatePaginate(filter);
        dataLogger("result of aggregatePaginate", result);
        return result;
      } catch (error) {
        errorLogger("error in aggregatePaginate function in mongoose service", error);
        throw error;
      }
    },

};

export default mongooseService