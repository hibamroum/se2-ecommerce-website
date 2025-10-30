import path from "path";
import dotenv from "dotenv";

//path to env file
const envFilePath = path.join(__dirname, "../", "../", ".env");
dotenv.config({ path: envFilePath });

//path to log directory
const logDirPath = path.join(__dirname, "../", "../", "logs");

export default {
  node_env: process.env.NODE_ENVIRONMENT,
  logDir: process.env.LOG_DIRECTORY_PATH || logDirPath,
};
