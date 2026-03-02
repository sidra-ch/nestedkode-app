const mongoose = require("mongoose");

// Instead of SRV, we use the direct seedlist to bypass DNS SRV block on Windows Node.js
// Wait, the replica set name from the TXT record was atlas-7m2p8j-shard-0 or something. 
// Let's use replicaSet=atlas-m4e20u-shard-0 (we need the actual TXT record)
// Wait, actually if we omit replicaSet, it might still connect to the primary if we're lucky, but for TLS we need `ssl=true&authSource=admin`

const directUri = "mongodb://mssidrachaudhary_db_user:HUMSAFAR@ac-xc4u4z8-shard-00-00.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-01.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-02.3m6zgzj.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority";

async function testConnection() {
    try {
        console.log("Connecting using Mongoose with Direct Seedlist URI...");
        await mongoose.connect(directUri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ Successfully connected to MongoDB directly!");

        // Check users
        const db = mongoose.connection.db;
        const count = await db.collection('users').countDocuments();
        console.log("Found users inside DB:", count);

    } catch (error) {
        console.error("Connection failed Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

testConnection();
