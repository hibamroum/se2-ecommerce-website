import fs from "fs";
import xml2js from "xml2js";
import logger from "../logger";
export const parseXML = (filePath: string): Promise<object[]> => {
  return new Promise((resolve, reject) => {
    //Step 1: read File
    fs.readFile(filePath, { encoding: "utf-8" }, (error, data) => {
      //step 2: parse read file data
      xml2js
        .parseStringPromise(data, {
          normalize: true, //Normalize whitespace in text nodes (replace multiple spaces with one).
          explicitArray: false, //put child nodes in an array, even if only one exists?
          explicitRoot: false, //Include the root node in the result object.
        })
        .then((result) => {
          //Step 3: work with parse data as needed
          resolve(result.row);
        })
        .catch((err) => {
          logger.error("Failed to parse XML File", { filePath, err });
          reject(err);
          throw new Error("Failed to parse XML File");
        });
      if (error) {
        logger.error("Failed to read XML File", { filePath, error });
        reject(error);
        throw new Error("Failed to read XML File");
      }
    });
  });
};

export const writeToXml = (filePath: string, data: object[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      new xml2js.Builder().buildObject(data),
      { encoding: "utf-8" },
      (error) => {
        if (error) {
          logger.error("Failed to write to XML File", { filePath, error });
          reject(error);
          throw new Error("Failed to write to XML File");
        }
      }
    );
    resolve();
  });
};
