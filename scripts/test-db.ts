import connectDB from "../lib/db";
import mongoose from "mongoose";

async function testConnection() {
    try {
        console.log("Connecting to MongoDB...");
        console.log("URI provided:", process.env.MONGODB_URI);
        await connectDB();
        console.log("Connection successful!");
        console.log("State:", mongoose.connection.readyState);
        process.exit(0);
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
}

testConnection();
