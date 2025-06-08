const CONFIG = {
  environment: process.env.NEXT_PUBLIC_ENV || "development",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "",
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
  getBasePath: function () {
    return CONFIG.NEXT_PUBLIC_BASE_PATH
      ? "/" + CONFIG.NEXT_PUBLIC_BASE_PATH
      : "";
  },
  getBaseUrl: () => {
    return CONFIG.NEXT_PUBLIC_BASE_URL ? CONFIG.NEXT_PUBLIC_BASE_URL : "";
  },
};

module.exports = CONFIG;
