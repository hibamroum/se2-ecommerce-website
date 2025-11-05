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

export const writeCSV = (filePath: string, data: string[][]): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        logger.error("Data must be non-empty array");
        throw new Error("Data must be non-empty array");
      }
      const csvContent = data
        .map((row) =>
          row
            .map((cell) => {
              const cellStr = String(cell);
              //handling special characters
              if (
                cellStr.includes(",") ||
                cellStr.includes('"') ||
                cellStr.includes("\r")
              ) {
                return `"${cellStr.replace(/"/g, '""')}`;//replace every single double quotations by 2 souble quotations
              }
              return cellStr;
            })
            .join(",")
        )
        .join("\n");
      fs.writeFile(filePath, csvContent, "utf-8", (error) => {
        if (error) {
          logger.error(`Failed to write to CSV File`, { filePath, error });
          reject(error);
          throw new Error(`Failed to write to CSV File ${filePath}`);
        }
        logger.info(`Successfully wrote to CSV File ${filePath}`);
        resolve()
      });
    } catch (error) {
      logger.error(`Failed to write to CSV File`, { filePath, error });
      reject(error);
      throw new Error(`Failed to write to CSV File ${filePath}`);
    }
  });
};
