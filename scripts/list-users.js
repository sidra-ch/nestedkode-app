const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env.local') });

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
}

// FIX FOR WINDOWS NODE.JS DNS BUG (MATCHING lib/db.ts):
if (MONGODB_URI.includes("mongodb+srv://") && MONGODB_URI.includes("cluster0.3m6zgzj.mongodb.net")) {
    const baseUri = "mongodb+srv://mssidrachaudhary_db_user:HUMSAFAR@cluster0.3m6zgzj.mongodb.net";
    const replacement = "mongodb://mssidrachaudhary_db_user:HUMSAFAR@ac-xc4u4z8-shard-00-00.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-01.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-02.3m6zgzj.mongodb.net:27017/Humsafardb";

    if (MONGODB_URI.startsWith(baseUri + "/")) {
        MONGODB_URI = MONGODB_URI.replace(baseUri + "/", replacement);
    } else {
        MONGODB_URI = MONGODB_URI.replace(baseUri, replacement);
    }

    if (!MONGODB_URI.includes("ssl=true")) {
        const joiner = MONGODB_URI.includes("?") ? "&" : "?";
        MONGODB_URI += `${joiner}ssl=true&authSource=admin&retryWrites=true&w=majority`;
    }
}

mongoose.connect(MONGODB_URI).then(async () => {
    try {
        console.log("✅ Connected to MongoDB.");
        const users = await mongoose.connection.db.collection('users').find({}).toArray();
        console.log("\nDATABASE USERS:");
        console.table(users.map(u => ({
            email: u.email,
            name: u.name,
            role: u.role,
            loginCount: u.loginCount || 0,
            hasPassword: !!u.password
        })));
    } catch (err) {
        console.error("❌ Error listing users:", err);
    } finally {
        process.exit(0);
    }
});
