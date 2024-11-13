import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//db imports
import { connect} from "./core/db";



//routes imports 
import hellooRoutes from "./modules/HelloModule";


// Load environment variables
dotenv.config();

const app = express();


// Middleware
app.use(express.json({ limit: "20mb" }));
app.use(cors());



//hello routes 
app.use("/api/hello", hellooRoutes);


app.listen(process.env.PORT, async () => {
    try {
      await connect();
      console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
      console.error("Error starting server:", error);
    }
  });
 




