import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Conectado com sucesso!");
    } catch (error) {
        console.log(error);   
    }
})();