import { IItem } from "../interface/IItem.interface";
import { Order } from "../model/order.model";

export class OrderBuilder {
  private id!: string;
  private item!: IItem;
  private price!: number;
  private quantity!: number;

  setId(id: string): OrderBuilder {
    this.id = id;
    return this;
  }
  setItem(item: IItem): OrderBuilder {
    this.item = item;
    return this;
  }
  setQuantity(quantity: number): OrderBuilder {
    this.quantity = quantity;
    return this;
  }
  setPrice(price: number): OrderBuilder {
    this.price = price;
    return this;
  }
  build(): Order {
    return new Order(this.id, this.item, this.price, this.quantity);
  }
}
