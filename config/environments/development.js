import * as dotenv from "dotenv";
if (process.env.NODE_ENV === "development") {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}
module.exports = {
  APP: {
    NAME: "Loyalty - Development",
    PORT: parseInt(process.env.ENV_LOYALTY_PORT || process.env.PORT),
    BASE_PATH: process.env.ENV_LOYALTY_BASE_PATH,
    VERSION: "1.0",
    AUTH_URL: process.env.ENV_LOYALTY_AUTH_URL,
    SOURCE: process.env.LOYALTY_SOURCE,
    SECRET: process.env.ENV_LOYALTY_SECRET
  },
  
  DB: {
    USERNAME: process.env.ENV_LOYALTY_DB_USERNAME,
    PASSWORD: process.env.ENV_LOYALTY_DB_PASSWORD,
    HOST: process.env.ENV_LOYALTY_DB_HOST,
    DATABASE_NAME: process.env.ENV_LOYALTY_DB_NAME,
    PORT: process.env.ENV_LOYALTY_DB_PORT,
    DIALECT: process.env.ENV_LOYALTY_DB_DIALECT,
    ENV_LOYALTY_DATABASE_DEBUG: false
  }
};
