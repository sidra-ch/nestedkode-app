// Prisma 7 config file for MongoDB connection

module.exports = {
  datasource: {
    provider: "mongodb",
    adapter: process.env.DATABASE_URL
  }
};
