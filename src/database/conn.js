import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Conectado com sucesso!");
    } catch (error) {
        console.log(error);   
    }
})();