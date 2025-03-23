import mongoose from "mongoose";
import {env} from './env';
export const mongoDb = async () => {
    try {
        if (!env.MONGO_URL) {
            throw new Error('MONGO_URL is not defined');
        }
        await mongoose.connect(env.MONGO_URL)
        console.log('Connected to MongoDB')
    }
    catch (error) {
        console.log(error)
    }
}