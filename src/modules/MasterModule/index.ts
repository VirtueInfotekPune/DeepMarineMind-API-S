import { Router } from "express";
import {addVesselRoute , findPaginateVesselRoute, updateVesselRoute, deleteVesselRoute } from "./function/vessel";
import { addDepartmentRoute, deleteDepartmentRoute, findPaginateDepartmentRoute, updateDepartmentRoute } from "./function/department";
import { addRankRoute, findPaginateRankRoute, updateRankRoute, deleteRankRoute } from "./function/rank";
import { addCargoRoute, deleteCargoRoute, findPaginateCargoRoute, updateCargoRoute } from "./function/cargo";
import { findPaginateIndustryRoute, addIndustryRoute, updateIndustryRoute, deleteIndustryRoute } from "./function/industry";
import { findCertificatePaginateRoute, addCertificateRoute, updateCertificateRoute, deleteCertificateRoute } from "./function/certificate";
import { findPaginateLicenceRoute, addLicenceRoute, updateLicenceRoute, deleteLicenceRoute } from "./function/licence";


const masterRoutes = Router();


//routes for Industry
masterRoutes.get("/industry" , findPaginateIndustryRoute);
masterRoutes.post("/industry" , addIndustryRoute);
masterRoutes.patch("/industry" , updateIndustryRoute);
masterRoutes.delete("/industry" , deleteIndustryRoute);

//routes for vessels
masterRoutes.get("/vessel" , findPaginateVesselRoute);
masterRoutes.post("/vessel" , addVesselRoute);
masterRoutes.patch("/vessel" , updateVesselRoute);
masterRoutes.delete("/vessel" , deleteVesselRoute);

// routes for department 
masterRoutes.get("/department" , findPaginateDepartmentRoute);
masterRoutes.post("/department" , addDepartmentRoute);
masterRoutes.patch("/department" , updateDepartmentRoute);
masterRoutes.delete("/department" , deleteDepartmentRoute);

// routes for rank 
masterRoutes.get("/rank" , findPaginateRankRoute);
masterRoutes.post("/rank" , addRankRoute);
masterRoutes.patch("/rank" , updateRankRoute);
masterRoutes.delete("/rank" , deleteRankRoute);

// routes for cargo 
masterRoutes.get("/cargo" , findPaginateCargoRoute);
masterRoutes.post("/cargo" , addCargoRoute);
masterRoutes.patch("/cargo" , updateCargoRoute);
masterRoutes.delete("/cargo" , deleteCargoRoute);

// routes for Certificates 
masterRoutes.get("/certificates" , findCertificatePaginateRoute);
masterRoutes.post("/certificates" , addCertificateRoute);
masterRoutes.patch("/certificates" , updateCertificateRoute);
masterRoutes.delete("/certificates" , deleteCertificateRoute);

// routes for Licences 
masterRoutes.get("/licences" , findPaginateLicenceRoute);
masterRoutes.post("/licences" , addLicenceRoute); 
masterRoutes.patch("/licences" ,updateLicenceRoute );
masterRoutes.delete("/licences" , deleteLicenceRoute);


export default masterRoutes;