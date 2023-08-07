import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongo db")
}).catch(error => console.log(error));