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

const normalizeEnvValue = (raw) => {
  let value = String(raw).trim();

  if (value.startsWith("export ")) {
    value = value.replace(/^export\s+\w+=/, "").trim();
  }
  if (value.includes("MONGO_URI=")) {
    value = value.split("MONGO_URI=").pop().trim();
  }

  return value.replace(/^["']|["']$/g, "");
};

const looksLikeClusterHost = (value) =>
  /\.mongodb\.(net|com)/i.test(value) && !value.includes("@");

const buildUriFromParts = (hostOverride = null) => {
  const user = pickEnv("MONGO_USER", "MONGODB_USER", "DB_USER");
  const password = pickEnv(
    "MONGO_PASSWORD",
    "MONGODB_PASSWORD",
    "DB_PASSWORD",
  );
  const host =
    hostOverride ||
    pickEnv("MONGO_HOST", "MONGO_CLUSTER", "MONGODB_HOST", "MONGODB_CLUSTER");

  if (!user || !password || !host) {
    return null;
  }

  if (isValidMongoUri(host)) {
    return host;
  }

  const hostname = host
    .replace(/^mongodb(\+srv)?:\/\//, "")
    .replace(/\/.*$/, "")
    .split("?")[0];

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);

  return `mongodb+srv://${encodedUser}:${encodedPassword}@${hostname}/?retryWrites=true&w=majority`;
};

const getMongoUri = () => {
  const rawDirect = pickEnv("MONGO_URI", "MONGO_URL", "MONGODB_URI");
  const direct = rawDirect ? normalizeEnvValue(rawDirect) : null;

  if (direct && isValidMongoUri(direct)) {
    if (direct.includes("<password>")) {
      throw new Error(
        'MONGO_URI still contains "<password>". Replace it with your real Atlas database password.',
      );
    }
    return direct;
  }

  const hostFromDirect =
    direct && looksLikeClusterHost(direct) ? direct : null;
  const fromParts = buildUriFromParts(hostFromDirect);

  if (fromParts) {
    if (direct) {
      console.warn(
        "[db] MONGO_URI was invalid; connected using MONGO_USER + MONGO_PASSWORD + MONGO_CLUSTER. " +
          "You can delete MONGO_URI on Render to avoid this warning.",
      );
    }
    return fromParts;
  }

  if (direct) {
    throw new Error(
      "MONGO_URI on Render is not a valid MongoDB URL.\n\n" +
        "Fix (choose ONE):\n" +
        "  A) Delete MONGO_URI and set: MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER (e.g. cluster0.xxxxx.mongodb.net)\n" +
        "  B) Replace MONGO_URI with the full Atlas string from Connect → Drivers:\n" +
        "     mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority\n\n" +
        "Do not set MONGO_URI to only the password.",
    );
  }

  const onRender = process.env.RENDER === "true";

  if (onRender || process.env.NODE_ENV === "production") {
    throw new Error(
      "MongoDB is not configured on Render.\n\n" +
        "Set either:\n" +
        "  • MONGO_URI = full mongodb+srv://... string from Atlas\n" +
        "  OR:\n" +
        "  • MONGO_USER + MONGO_PASSWORD + MONGO_CLUSTER (hostname only)",
    );
  }

  return DEFAULT_URI;
};

const getMongoOptions = () => ({
  dbName: process.env.MONGO_DB_NAME || "template_store",
});

module.exports = { getMongoUri, getMongoOptions };
