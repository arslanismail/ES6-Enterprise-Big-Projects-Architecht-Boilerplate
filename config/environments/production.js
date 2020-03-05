module.exports = {
  APP: {
    NAME: "OTP - Production",
    PORT: parseInt(process.env.ENV_CDT_PORT || process.env.PORT),
    BASE_PATH: process.env.ENV_CDT_BASE_PATH,
    VERSION: "1.0",
    AUTH_URL: process.env.ENV_CDT_AUTH_URL,
    SOURCE: process.env.ENV_CDT_SOURCE,
    SECRET: process.env.ENV_LOYALTY_SECRET
  },
  CORE_BANKING: {
    BASE_URL: process.env.ENV_CDT_CORE_BANKING_BASE_URL
  },
  DB: {
    USERNAME: process.env.ENV_CDT_DB_USERNAME,
    PASSWORD: process.env.ENV_CDT_DB_PASSWORD,
    HOST: process.env.ENV_CDT_DB_HOST,
    DATABASE_NAME: process.env.ENV_CDT_DB_NAME,
    PORT: process.env.ENV_CDT_DB_PORT,
    DIALECT: process.env.ENV_CDT_DB_DIALECT,
    ENV_CDT_DATABASE_DEBUG: false
  }
};
