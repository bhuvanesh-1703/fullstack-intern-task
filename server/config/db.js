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

const looksLikePasswordOnly = (value) =>
  !isValidMongoUri(value) &&
  !looksLikeClusterHost(value) &&
  !value.includes("@") &&
  !value.includes("/");

const getMissingPartKeys = () => {
  const missing = [];
  if (!pickEnv("MONGO_USER", "MONGODB_USER", "DB_USER")) {
    missing.push("MONGO_USER");
  }
  if (!pickEnv("MONGO_PASSWORD", "MONGODB_PASSWORD", "DB_PASSWORD")) {
    missing.push("MONGO_PASSWORD");
  }
  if (
    !pickEnv("MONGO_HOST", "MONGO_CLUSTER", "MONGODB_HOST", "MONGODB_CLUSTER")
  ) {
    missing.push("MONGO_CLUSTER");
  }
  return missing;
};

const buildUriFromParts = (hostOverride = null, passwordOverride = null) => {
  const user = pickEnv("MONGO_USER", "MONGODB_USER", "DB_USER");
  const password =
    passwordOverride ||
    pickEnv("MONGO_PASSWORD", "MONGODB_PASSWORD", "DB_PASSWORD");
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
  const passwordFromDirect =
    direct && looksLikePasswordOnly(direct) ? direct : null;
  const fromParts = buildUriFromParts(hostFromDirect, passwordFromDirect);

  if (fromParts) {
    if (direct) {
      console.warn(
        "[db] MONGO_URI was invalid; connected using MONGO_USER + MONGO_PASSWORD + MONGO_CLUSTER. " +
          "Delete MONGO_URI on Render and use the three variables instead.",
      );
    }
    return fromParts;
  }

  if (direct) {
    const missing = getMissingPartKeys();
    const passwordHint = looksLikePasswordOnly(direct)
      ? " MONGO_URI looks like only a password — remove it and use the variables below."
      : "";

    throw new Error(
      "MONGO_URI on Render is not a valid MongoDB URL." +
        passwordHint +
        "\n\n" +
        (missing.length
          ? `Also missing on Render: ${missing.join(", ")}\n\n`
          : "\n") +
        "Do this on Render → Environment:\n" +
        "  1. DELETE the variable MONGO_URI\n" +
        "  2. ADD these (get cluster host from Atlas → Connect → Drivers):\n" +
        "       MONGO_USER     = your Atlas database username\n" +
        "       MONGO_PASSWORD = your Atlas database password\n" +
        "       MONGO_CLUSTER  = cluster0.xxxxx.mongodb.net\n" +
        "       MONGO_DB_NAME  = template_store\n" +
        "       JWT_SECRET     = any long random string",
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
