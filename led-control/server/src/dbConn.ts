import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {

    try {
        mongoose.set('strictQuery', true); // needed to silence deprecation warning
        await mongoose.connect(process.env.DATABASE_URI || '');
    } catch (err) {
        console.error(err);
    }
}