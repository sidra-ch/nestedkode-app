import connectDB from "../lib/db";
import User from "../models/User";
import mongoose from "mongoose";

async function testQuery() {
    try {
        console.log("Connecting to Database...");
        await connectDB();
        console.log("Connection successful! Fetching users...");

        const count = await User.countDocuments();
        console.log(`Total users in DB: ${count}`);

        if (count > 0) {
            const sampleUser = await User.findOne().select('-password');
            console.log("Sample user:", sampleUser);
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Query failed:", error);
        process.exit(1);
    }
}

testQuery();
