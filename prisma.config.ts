// Prisma 7 config file for MongoDB connection

export default {
  datasource: {
    provider: "mongodb",
    adapter: process.env.DATABASE_URL,
  },
};
