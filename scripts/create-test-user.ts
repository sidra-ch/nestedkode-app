import connectDB from "../lib/db";
import User from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

async function createTestUser() {
    try {
        console.log("Connecting to Database...");
        await connectDB();
        console.log("Connection successful!");

        const testEmail = "testuser@example.com";

        // Check if test user exists
        const existingUser = await User.findOne({ email: testEmail });
        if (existingUser) {
            console.log("Test user already exists:", existingUser.email);
        } else {
            const hashedPassword = await bcrypt.hash("password123", 10);
            const newUser = new User({
                name: "Test User",
                email: testEmail,
                password: hashedPassword,
                role: "user",
                phone: "0790123456"
            });
            await newUser.save();
            console.log("Created test user:", testEmail, "with password: password123");
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Test user creation failed:", error);
        process.exit(1);
    }
}

createTestUser();
