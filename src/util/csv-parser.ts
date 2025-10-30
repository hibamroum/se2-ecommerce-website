import fs, { ReadStream } from "fs";
import logger from "./logger";

export const parseCSV = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    let parsedData: string[][] = [];
    const readStream: ReadStream = fs.createReadStream(filePath, {
      encoding: "utf-8",
    });

    readStream.on("data", (chunk: any) => {
      const rows = chunk.split("\n").filter((row: any) => row.trim() !== "");
      rows.forEach((row: any) => {
        const columns = row
          .split(",")
          .map((value: any) => value.trim().replace(/^"(.*)"$/, "$1"));
        parsedData.push(columns);
      });
    });

    readStream.on("end", () => {
      resolve(parsedData);
    });

    readStream.on("error", (error) => {
      logger.error("Error while reading csv file", {
        file: filePath,
        error: error,
      });
      reject(error);
    });
  });
};
