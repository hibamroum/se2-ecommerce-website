import config from "../../config";
import { IOrder } from "../../interface/IOrder.interface";
import {
  XMLOrderMapper,
  xmlOrderObject,
} from "../../mappers/order-mapper.mapper";
import { ToyMapper } from "../../mappers/toy-mapper.mapper";
import { parseXML, writeToXml } from "../../util/parsers/xml-parser";
import { OrderRepository } from "./order.repository";

export class ToyRepository extends OrderRepository {
  constructor() {
    super();
  }
  private readonly toyMapper = new ToyMapper();
  protected async load(): Promise<IOrder[]> {
    //Step 1: parse XML Data
    const parsedXmlData = await parseXML(config.fileStorage.xml.toyData);
    //Step 2: map parsed XMl to Orders and return as array of orders
    return parsedXmlData.map((toyOrder) =>
      new XMLOrderMapper(this.toyMapper).map(toyOrder as xmlOrderObject)
    );
  }
  protected async save(orders: IOrder[]): Promise<void> {
    const objectOrders = orders.map((toyOrder) =>
      new XMLOrderMapper(this.toyMapper).reverseMap(toyOrder)
    );
    return writeToXml(config.fileStorage.xml.toyData, objectOrders);
  }
}
