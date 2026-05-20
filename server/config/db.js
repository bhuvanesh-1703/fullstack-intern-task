const DEFAULT_URI = "mongodb://127.0.0.1:27017";

const getMongoUri = () => {
  const raw =
    process.env.MONGO_URI ||
    process.env.MONGO_URL ||
    process.env.MONGODB_URI ||
    DEFAULT_URI;

  const uri = String(raw).trim().replace(/^["']|["']$/g, "");

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      'MONGO_URI must be a full connection string starting with "mongodb://" or "mongodb+srv://". ' +
        "On Render, set MONGO_URI in Environment (not just the password). " +
        "Example: mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority",
    );
  }

  return uri;
};

const getMongoOptions = () => ({
  dbName: process.env.MONGO_DB_NAME || "template_store",
});

module.exports = { getMongoUri, getMongoOptions };
