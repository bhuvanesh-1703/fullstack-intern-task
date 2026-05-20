const getMongoUri = () =>
  process.env.MONGO_URI ||
  process.env.MONGO_URL ||
  "mongodb://127.0.0.1:27017";

const getMongoOptions = () => ({
  dbName: process.env.MONGO_DB_NAME || "template_store",
});

module.exports = { getMongoUri, getMongoOptions };
