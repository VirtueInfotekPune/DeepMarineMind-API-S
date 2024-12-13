import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//db imports
import { connect} from "./core/db";



//routes imports 
import hellooRoutes from "./modules/HelloModule";
import authRoutes from "./modules/AuthModule";
import masterRoutes from "./modules/MasterModule";
import userRoutes from "./modules/UserModule";
import candidateInfo from "./modules/CandidateDetailsModule";
import recruiterDetailsRoutes from "./modules/FleetModules"
import whiteListRoutes from "./modules/WhiteListModule";
import recruiterRoutes from "./modules/RecruiterModule";



// Load environment variables
dotenv.config();

const app = express();


// Middleware
app.use(express.json({ limit: "20mb" }));
app.use(cors());



//hello routes 
app.use("/api/hello", hellooRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/master", masterRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recruiter" , recruiterRoutes)
app.use("/api", candidateInfo);
app.use("/api", recruiterDetailsRoutes);
app.use("/api", whiteListRoutes);



app.listen(process.env.PORT, async () => {
    try {
      await connect();
      console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    } catch (error) {
      console.error("Error starting server:", error);
    }
  });
 




