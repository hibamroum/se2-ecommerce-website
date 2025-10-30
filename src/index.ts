import { parseCSV } from "./util/csv-parser";

const pathToCSVFile = "/data/cake orders.csv";
const main = async () => {
  const parsedCakes = await parseCSV("./src/data/cake orders.csv");
  console.log(parsedCakes);
};
main();
