import mongoose from "mongoose";
import dotenv from "dotenv";
import Branch from "../models/Branch";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/afghanibaba";

const branches = [
    {
        name: "Afghan Baba - Kabul Main Branch",
        city: "Kabul",
        address: "Shahr-e-Naw, Kabul, Afghanistan",
        phone: "+93 700 123 456",
        whatsapp: "+93 700 123 456",
        email: "kabul@afghanbaba.com",
        latitude: 34.5353,
        longitude: 69.1775,
        isMainBranch: true,
    },
    {
        name: "Afghan Baba - Herat Branch",
        city: "Herat",
        address: "Main Road, Herat, Afghanistan",
        phone: "+93 799 111 222",
        whatsapp: "+93 799 111 222",
        email: "herat@afghanbaba.com",
        latitude: 34.3419,
        longitude: 62.2031,
        isMainBranch: false,
    },
    {
        name: "Afghan Baba - Mazar-e-Sharif Branch",
        city: "Mazar-e-Sharif",
        address: "Blue Mosque Square, Mazar-e-Sharif, Afghanistan",
        phone: "+93 788 333 444",
        whatsapp: "+93 788 333 444",
        email: "mazar@afghanbaba.com",
        latitude: 36.7022,
        longitude: 67.1106,
        isMainBranch: false,
    },
    {
        name: "Afghan Baba - Kandahar Branch",
        city: "Kandahar",
        address: "Aino Mena, Kandahar, Afghanistan",
        phone: "+93 777 555 666",
        whatsapp: "+93 777 555 666",
        email: "kandahar@afghanbaba.com",
        latitude: 31.6289,
        longitude: 65.7372,
        isMainBranch: false,
    },
];

async function seedBranches() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing branches
        await Branch.deleteMany({});
        console.log("Cleared existing branches");

        // Insert new branches
        await Branch.insertMany(branches);
        console.log("Successfully seeded branches");

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error seeding branches:", error);
        process.exit(1);
    }
}

seedBranches();
