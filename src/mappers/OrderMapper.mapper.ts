import { OrderBuilder } from "../builders/order.builder";
import { IItem } from "../interface/IItem.interface";
import { IMapper } from "../interface/IMapper.interface";
import { Order } from "../model/order.model";

export class OrderMapper implements IMapper<string[], Order> {
  constructor(private itemMapper: IMapper<string[], IItem>) {} //*
  map(data: string[]): Order {
    const mappedItem = this.itemMapper.map(data);
    return new OrderBuilder()
      .setItem(mappedItem)
      .setId(String(data[0]))
      .setPrice(Number(data[15]))
      .setQuantity(Number(data[16]))
      .build();
  }
}
