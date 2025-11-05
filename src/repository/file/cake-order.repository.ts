import path from "path";
import { CakeMapper } from "../../mappers/CakeMapper.mapper";
import { OrderMapper } from "../../mappers/OrderMapper.mapper";
import { Order } from "../../model/order.model";
import { parseCSV, writeCSV } from "../../util/csv-parser";
import { OrderRepository } from "./order.repository";
import { IOrder } from "../../interface/IOrder.interface";

export class CakeOrderRepository extends OrderRepository {
  private cakeMapper = new CakeMapper(); //To void dupplication of cakeMapper instantiation in each function
  constructor(private readonly filePath: string) {
    super();
  }
  protected async load(): Promise<IOrder[]> {
    //Step 1: read 2D strings
    const cakeData = await parseCSV(this.filePath);
    //Step 2: convert 2D strings to an object
    const cakeOrders = cakeData.map((cakeOrder) =>
      new OrderMapper(this.cakeMapper).map(cakeOrder)
    );
    //Step 3: return list of objects
    return cakeOrders;
  }
  protected save(orders: IOrder[]): Promise<void> {
    //Step 1: generate list of headers
    const headers = [
      "id",
      "Type",
      "Flavor",
      "Filling",
      "Size",
      "Layers",
      "Frosting Type",
      "Frosting Flavor",
      "Decoration Type",
      "Decoration Color",
      "Custom Message",
      "Shape",
      "Allergies",
      "Special Ingredients",
      "Packaging Type",
      "Price",
      "Quantity",
    ];
    //Step 2: convert orders to 2D string
    let stringOrdersArray: string[][] = [];

    stringOrdersArray = orders.map((order) =>
      new OrderMapper(this.cakeMapper).reverseMap(order)
    );
    //Step 3: write to CSV
    const pathToCakesFile = path.join(
      __dirname,
      "../",
      "data",
      "cake orders.csv"
    );
    return writeCSV(pathToCakesFile, [headers, ...stringOrdersArray]);
  }
}
