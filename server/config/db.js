const DEFAULT_URI = "mongodb://127.0.0.1:27017";

const isValidMongoUri = (uri) =>
  uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://");

const pickEnv = (...keys) => {
  for (const key of keys) {
    const value = process.env[key];
    if (value != null && String(value).trim() !== "") {
      return String(value).trim().replace(/^["']|["']$/g, "");
    }
  }
  return null;
};

const buildUriFromParts = () => {
  const user = pickEnv("MONGO_USER", "MONGODB_USER", "DB_USER");
  const password = pickEnv("MONGO_PASSWORD", "MONGODB_PASSWORD", "DB_PASSWORD");
  const host = pickEnv(
    "MONGO_HOST",
    "MONGO_CLUSTER",
    "MONGODB_HOST",
    "MONGODB_CLUSTER",
  );

  if (!user || !password || !host) {
    return null;
  }

  if (isValidMongoUri(host)) {
    return host;
  }

  const hostname = host.replace(/^mongodb(\+srv)?:\/\//, "");
  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);

  return `mongodb+srv://${encodedUser}:${encodedPassword}@${hostname}/?retryWrites=true&w=majority`;
};

const getMongoUri = () => {
  const direct = pickEnv("MONGO_URI", "MONGO_URL", "MONGODB_URI");

  if (direct) {
    if (isValidMongoUri(direct)) {
      return direct;
    }

    throw new Error(
      "MONGO_URI is set on Render but is not a full connection string. " +
        "Replace it with the complete Atlas URI from Connect → Drivers " +
        '(starts with "mongodb+srv://"). Do not paste only the password.',
    );
  }

  const fromParts = buildUriFromParts();
  if (fromParts) {
    return fromParts;
  }

  const onRender = process.env.RENDER === "true";

  if (onRender || process.env.NODE_ENV === "production") {
    throw new Error(
      "MongoDB is not configured for production. On Render → Environment, set either:\n" +
        "  • MONGO_URI = full Atlas string (mongodb+srv://USER:PASSWORD@cluster....mongodb.net/...)\n" +
        "  OR all three:\n" +
        "  • MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER (hostname only, e.g. cluster0.abcd.mongodb.net)",
    );
  }

  return DEFAULT_URI;
};

const getMongoOptions = () => ({
  dbName: process.env.MONGO_DB_NAME || "template_store",
});

module.exports = { getMongoUri, getMongoOptions };
