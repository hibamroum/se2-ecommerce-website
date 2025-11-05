import { IOrder } from "../../interface/IOrder.interface";
import { id, IRepository } from "../../interface/IRepository.interface";
import { Order } from "../../model/order.model";
import {
  InvalidItemException,
  ItemNotFoundException,
} from "../../util/exceptions/repository-exceptions";
import logger from "../../util/logger";

export abstract class OrderRepository implements IRepository<IOrder> {
  protected abstract load(): Promise<IOrder[]>;
  protected abstract save(orders: IOrder[]): Promise<void>;

  async create(item: IOrder): Promise<id> {
    //Step 1: Validate the item
    if (!item) {
      throw new InvalidItemException("Order cannot be empty");
    }
    // Step 2:Load all orders
    const allOrders = await this.load();
    //Step 3: create the new order
    const id = allOrders.push(item); //Appends new elements to the end of an array, and returns the new length of the array.
    //Step 4: save all orders
    await this.save(allOrders);
    logger.info("Successfuly created order with ID %s", String(id));
    //Step 5: return the ID of the newly created order
    return String(id);
  }
  async readOne(id: id): Promise<IOrder> {
    const allOrders = await this.load();
    const foundOrder = allOrders.find((order) => order.getId() === id); //id is an object that has functionality getId()
    if (!foundOrder) {
      logger.error("Failed to find Order with ID: %s", id);
      throw new ItemNotFoundException(`Failed to find order with Id: ${id}`);
    }
    logger.info("Found order", foundOrder);
    return foundOrder;
  }
  async readAll(): Promise<IOrder[]> {
    const allOrders = await this.load();
    logger.info("Successfully loaded %d orders.", allOrders.length);
    return allOrders;
  }
  async update(id: id, item: IOrder): Promise<IOrder> {
    //Step 1: Validate the item
    if (!item) {
      logger.error("Order cannot be null");
      throw new InvalidItemException("Order cannot be empty");
    }
    //Step 2: load all orders
    const allOrders = await this.load();
    //Step 3: find item with the provided id
    let foundOrderIndex = allOrders.findIndex((order) => order.getId() === id);
    if (foundOrderIndex === -1) {
      logger.error("Failed to find Order with ID: %s", id);
      throw new ItemNotFoundException(`Failed to find order with Id: ${id}`);
    }
    //Step 4: update the item with the specified id
    allOrders[foundOrderIndex] = item;
    //Step 5: save the newly updated item
    await this.save(allOrders);
    //Step 6: return the newly updated item
    return allOrders[foundOrderIndex];
  }
  async delete(id: id): Promise<void> {
    let allOrders = await this.load();
    const foundOrderIndex = allOrders.findIndex(
      (order) => order.getId() === id
    ); //id is an object that has functionality getId()
    if (foundOrderIndex === -1) {
      logger.error("Failed to find Order with ID: %s", id);
      throw new ItemNotFoundException(`Failed to find order with Id: ${id}`);
    }
    allOrders.splice(foundOrderIndex, 1);
    await this.save(allOrders);
    logger.info("Successfuly deleted order with ID %s", id);
  }
}
