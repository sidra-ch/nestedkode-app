const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
});

async function run() {
    try {
        console.log("Connecting to MongoDB Atlas Cluster directly...");
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db("admin");
        const pingResult = await db.command({ ping: 1 });
        console.log("Ping result:", pingResult);

    } catch (err) {
        console.error("Connection failed Error:", err.message);
        if (err.reason) console.error("Reason:", err.reason);
    } finally {
        await client.close();
    }
}

run();
