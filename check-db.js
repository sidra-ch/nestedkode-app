const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function check() {
    let MONGODB_URI = process.env.MONGODB_URI;
    if (MONGODB_URI) {
        const redacted = MONGODB_URI.replace(/:([^:@]+)@/, ':****@');
        console.log('Original URI (Redacted):', redacted);
    } else {
        console.log('Original URI: NONE');
    }

    if (MONGODB_URI && MONGODB_URI.includes("mongodb+srv://") && MONGODB_URI.includes("cluster0.3m6zgzj.mongodb.net")) {
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
        console.log('Modified URI (Windows fix applied)');
    }

    if (!MONGODB_URI) {
        console.error('No MONGODB_URI found');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to:', mongoose.connection.name);

        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('\nAvailable Databases:');
        dbs.databases.forEach(db => {
            console.log(` - ${db.name}`);
        });

        console.log(`\nCollections in ${mongoose.connection.name}:`);
        const collections = await mongoose.connection.db.listCollections().toArray();
        collections.forEach(c => console.log(' -', c.name));

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

check();
