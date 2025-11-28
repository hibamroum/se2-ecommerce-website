import path from "path";
import dotenv from "dotenv";

//path to env file
const envFilePath = path.join(__dirname, "../", "../", ".env");
//path to log directory
const logDirPath = path.join(__dirname, "../", "../", "logs");
//path to cake data
const pathToCakeData = path.join(__dirname, "../", "data", "cake orders.csv");
//path to toy data
const pathToToyData = path.join(__dirname, "../", "data", "toy orders.xml");

dotenv.config({ path: envFilePath });
export default {
  node_env: process.env.NODE_ENVIRONMENT,
  logDir: process.env.LOG_DIRECTORY_PATH || logDirPath,
  fileStorage: {
    csv: {
      cakeData: pathToCakeData,
    },
    xml: {
      toyData: pathToToyData,
    },
  },
};
