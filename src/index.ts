import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//db imports
import { connect} from "./core/db";



//routes imports 
import hellooRoutes from "./modules/HelloModule";
import authRoutes from "./modules/AuthModule";
import masterRoutes from "./modules/MasterModule";
import experienceRoutes from "./modules/ExperienceModule";
import userRoutes from "./modules/UserModule";


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
app.use("/api/experience", experienceRoutes);
app.use("/api/user", userRoutes);


app.listen(process.env.PORT, async () => {
    try {
      await connect();
      console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    } catch (error) {
      console.error("Error starting server:", error);
    }
  });
 




