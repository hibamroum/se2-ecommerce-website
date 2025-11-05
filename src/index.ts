import { CakeOrderRepository } from "./repository/file/cake-order.repository";
import config from "./config";

const main = async () => {
  const repository = new CakeOrderRepository(config.fileStorage.csv.cakeData);
  const savedData = await repository.readAll();
  console.log(savedData);
};
main();
