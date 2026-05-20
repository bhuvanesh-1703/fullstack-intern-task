// MongoDB connection settings (values come from .env or Render Environment)

const getMongoUri = () => {
  return process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
};

const getMongoOptions = () => {
  return {
    dbName: process.env.MONGO_DB_NAME || "template_store",
  };
};

module.exports = { getMongoUri, getMongoOptions };
