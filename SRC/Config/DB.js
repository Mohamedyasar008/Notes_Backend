import mongoose from "mongoose"

export const Connectdb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGODB is connected successfully")
    } catch (error) {
       console.error("Connection to MONGODB is failed", error) 
       process.exit(1)    
    }
}
