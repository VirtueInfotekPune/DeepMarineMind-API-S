import { infoLogger , errorLogger , dataLogger } from "../../core/logger";
import { vesselDocument , vesselModel } from "../../models/master/vessel";


interface VesselService {
  saveVessel: (data: any) => Promise<any>;
  updateVessel: (filter: any, payload: any) => Promise<any>;
  deleteVessel : (filter : any) => Promise<any>;
  // findOneVessel : (filter: any) => Promise<any>;
  findAllVessel : (filter: any) => Promise<any>;
  // paginate : (filter: any) => Promise<any>;
  // aggregatePaginate : (filter: any) => Promise<any>;
}

const vesselService: VesselService = {
  saveVessel: async (data) => {
    try {
      infoLogger("START:- save function in vessel service");
      const result = await vesselModel.create(data);
      dataLogger("result of save", result);
      return result;
    } catch (error) {
      errorLogger("error in save function in vessel service", error);
      throw error;
    }
  },

  updateVessel: async (filter , payload ) => {
    try {
      infoLogger("START:- update function in vessel service");
      const result = await vesselModel.findOneAndUpdate(filter , payload , {new : true});
      dataLogger("result of update", result);
      return result;
    } catch (error) {
      errorLogger("error in update function in vessel service", error);
      throw error;
    }
  },

  deleteVessel : async (filter) => {
    try {
      infoLogger("START:- delete function in mongoose service");
      const result = await vesselModel.findOneAndDelete(filter);
      dataLogger("result of delete", result);
      return result;
    } catch (error) {
      errorLogger("error in delete function in mongoose service", error);
      throw error;
    }
  },

  // findOneVessel : async (filter) => {
  //   try {
  //     infoLogger("START:- findOne function in vessel service");
  //     const result = await vesselModel.findOne(filter);
  //     dataLogger("result of findOne", result);
  //     return result;
  //   } catch (error) {
  //     errorLogger("error in findOne function in vessel service", error);
  //     throw error;
  //   }
  // },

  findAllVessel : async (filter) => {
    try {
      infoLogger("START:- findAll function in vessel service");
      const result = await vesselModel.find(filter);
      dataLogger("result of findAll", result);
      return result;
    } catch (error) {
      errorLogger("error in findAll function in vessel service", error);
      throw error;
    }
  },


//   paginate : async (filter) => {
//     try {
//       infoLogger("START:- paginate function in mongoose service");
//       const result = await vesselModel.paginate(filter);
//       dataLogger("result of paginate", result);
//       return result;
//     } catch (error) {
//       errorLogger("error in paginate function in mongoose service", error);
//       throw error;
//     }
//   },

//   aggregatePaginate : async (filter) => {
//     try {
//       infoLogger("START:- aggregatePaginate function in mongoose service");
//       const result = await vesselModel.aggregatePaginate(filter);
//       dataLogger("result of aggregatePaginate", result);
//       return result;
//     } catch (error) {
//       errorLogger("error in aggregatePaginate function in mongoose service", error);
//       throw error;
//     }
//   },


}


export default vesselService



















//  saveVessale : async (model, data) => {
//   try {
//     infoLogger("START: saveVessale function");
//     dataLogger("vessel", vessel);
//     const result = await vesselModel.create(vessel);
//     return result;
//   } catch (error) {
//     errorLogger("Error in saveVessale function", error);
//     throw error;
//   }
// };

// export const getVessels = async (filter : any ) => {
//   try {
//     infoLogger("START: getVessels function");
//     const result = await vesselModel.find(filter);
//     return result;
//   } catch (error) {
//     errorLogger("Error in getVessels function", error);
//     throw error;
//   }
// };

// export const paginateVessels = async (filter : any , options  : any ) => {
//   try {
//     infoLogger("START: paginateVessels function");
//     const result = await vesselModel.paginate(filter , options);
//     return result;
//   } catch (error) {
//     errorLogger("Error in paginateVessels function", error);
//     throw error;
//   }
// };

// export const updateVesseles = async (filter : any , payload : any ) => {
//   try {
//     infoLogger("START: updateVesseles function");
//     const result = await vesselModel.findOneAndUpdate(filter , payload , {new : true});
//     return result;
//   } catch (error) {
//     errorLogger("Error in updateVesseles function", error);
//     throw error;
//   }
// };

// export const deleteVessale = async (filter : any ) => {
//   try {
//     infoLogger("START: deleteVessale function");
//     const result = await vesselModel.findOneAndDelete(filter);
//     return result;
//   } catch (error) {
//     errorLogger("Error in deleteVessale function", error);
//     throw error;
//   }
// };

// export const findByIdVessale = async (filter : any ) => {
//   try {
//     infoLogger("START: findByIdVessale function");
//     const result = await vesselModel.findById(filter);
//     return result;
//   } catch (error) {
//     errorLogger("Error in findByIdVessale function", error);
//     throw error;
//   }
// };


