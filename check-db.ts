import mongoose from 'mongoose';
import connectDB from './lib/db';

async function check() {
    try {
        await connectDB();
        console.log('Database Name:', mongoose.connection.name);

        if (mongoose.connection.db) {
            console.log('Collections in', mongoose.connection.name + ':');
            const collections = await mongoose.connection.db.listCollections().toArray();
            collections.forEach(c => console.log(' -', c.name));

            console.log('\nChecking all databases...');
            const admin = mongoose.connection.db.admin();
            const dbs = await admin.listDatabases();
            console.log('All Databases:', dbs.databases.map((d: any) => d.name).join(', '));
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
