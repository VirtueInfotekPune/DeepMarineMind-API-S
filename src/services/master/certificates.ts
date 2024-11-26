import { infoLogger, errorLogger, dataLogger } from "../../core/logger";
import { certificateModel } from "../../models/master/certificates";


interface CertificateService {
    saveCertificate: (data: any) => Promise<any>;
    findOneCertificate: (filter: any) => Promise<any>;
    findAllCertificate: (filter: any) => Promise<any>;
    updateCertificate: (filter: any, payload: any) => Promise<any>;
    deleteCertificate: (filter: any) => Promise<any>;
    paginate: (filter: any, options: any) => Promise<any>;
}

const certificateService: CertificateService = {
    saveCertificate: async (data: any) => {
        try {
            infoLogger("START:- saveCertificate function in mongoose service");
            const result = await certificateModel.create(data);
            dataLogger("result of saveCertificate", result);
            return result;
        } catch (error) {
            errorLogger("error in saveCertificate function in mongoose service", error);
            throw error;
        }
    },
    findOneCertificate: async (filter: any) => {
        try {
            infoLogger("START:- findOneCertificate function in mongoose service");
            const result = await certificateModel.findOne(filter);
            dataLogger("result of findOneCertificate", result);
            return result;
        } catch (error) {
            errorLogger("error in findOneCertificate function in mongoose service", error);
            throw error;
        }
    },
    findAllCertificate: async (filter: any) => {
        try {
            infoLogger("START:- findAllCertificate function in mongoose service");
            const result = await certificateModel.find(filter);
            dataLogger("result of findAllCertificate", result);
            return result;
        } catch (error) {
            errorLogger("error in findAllCertificate function in mongoose service", error);
            throw error;
        }
    },

    updateCertificate: async (filter: any, payload: any) => {
        try {
            infoLogger("START:- updateCertificate function in mongoose service");
            const result = await certificateModel.findOneAndUpdate(filter, payload, { new: true });
            dataLogger("result of updateCertificate", result);
            return result;
        } catch (error) {
            errorLogger("error in updateCertificate function in mongoose service", error);
            throw error;
        }
    },
    deleteCertificate: async (filter: any) => {
        try {
            infoLogger("START:- deleteCertificate function in mongoose service");
            const result = await certificateModel.findOneAndDelete(filter);
            dataLogger("result of deleteCertificate", result);
            return result;
        } catch (error) {
            errorLogger("error in deleteCertificate function in mongoose service", error);
            throw error;
        }
    },

    paginate: async (filter: any, options: any) => {
        try {
            infoLogger("START:- paginate function in mongoose service");
            const result = await certificateModel.paginate(filter, options);
            dataLogger("result of paginate", result);
            return result;
        } catch (error) {
            errorLogger("error in paginate function in mongoose service", error);
            throw error;
        }
    },
}

export default certificateService;