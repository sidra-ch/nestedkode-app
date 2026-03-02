const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

async function testConnection() {
    try {
        console.log("Connecting using Mongoose with Google DNS...");
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Successfully connected to MongoDB!");

        // Check users
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

    } catch (error) {
        console.error("Connection failed Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testConnection();
