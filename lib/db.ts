import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  let MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  // FIX FOR WINDOWS NODE.JS DNS BUG:
  // Node.js on some Windows networks fails to resolve mongodb+srv:// SRV records.
  // We intercept the Atlas URI and convert it to the direct replica set seedlist format.
  if (MONGODB_URI.includes("mongodb+srv://") && MONGODB_URI.includes("cluster0.3m6zgzj.mongodb.net")) {
    const baseUri = "mongodb+srv://mssidrachaudhary_db_user:HUMSAFAR@cluster0.3m6zgzj.mongodb.net";
    const replacement = "mongodb://mssidrachaudhary_db_user:HUMSAFAR@ac-xc4u4z8-shard-00-00.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-01.3m6zgzj.mongodb.net:27017,ac-xc4u4z8-shard-00-02.3m6zgzj.mongodb.net:27017/Humsafardb";

    if (MONGODB_URI.startsWith(baseUri + "/")) {
      MONGODB_URI = MONGODB_URI.replace(baseUri + "/", replacement);
    } else {
      MONGODB_URI = MONGODB_URI.replace(baseUri, replacement);
    }

    // Ensure SSL and auth options are appended for direct replSets
    if (!MONGODB_URI.includes("ssl=true")) {
      const joiner = MONGODB_URI.includes("?") ? "&" : "?";
      MONGODB_URI += `${joiner}ssl=true&authSource=admin&retryWrites=true&w=majority`;
    }
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
