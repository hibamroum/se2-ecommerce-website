import path from "path";
import { CakeMapper } from "../../mappers/cake-mapper.mapper";
import { CSVOrderMapper } from "../../mappers/order-mapper.mapper";
import { Order } from "../../model/order.model";
import { parseCSV, writeCSV } from "../../util/parsers/csv-parser";
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
      new CSVOrderMapper(this.cakeMapper).map(cakeOrder)
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
    const stringOrdersArray = orders.map((order) =>
      new CSVOrderMapper(this.cakeMapper).reverseMap(order)
    );
    //Step 3: write to CSV
    return writeCSV(this.filePath, [headers, ...stringOrdersArray]);
  }
}
