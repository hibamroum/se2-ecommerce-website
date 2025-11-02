import path from "path";
import { parseCSV } from "./util/csv-parser";
import { CakeMapper } from "./mappers/CakeMapper.mapper";
import { OrderMapper } from "./mappers/OrderMapper.mapper";

const main = async () => {
  const pathToCakeData = path.join(__dirname, "/data", "cake orders.csv");
  const parsedData = await parseCSV(pathToCakeData);
  const cakeMapper = new CakeMapper();
  const mappedOrders = parsedData.map((row) =>
    new OrderMapper(cakeMapper).map(row)
  );
  console.log(mappedOrders)
};
main();
