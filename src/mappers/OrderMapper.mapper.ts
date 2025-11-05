import { OrderBuilder } from "../builders/order.builder";
import { IItem } from "../interface/IItem.interface";
import { IMapper } from "../interface/IMapper.interface";
import { IOrder } from "../interface/IOrder.interface";

export class OrderMapper implements IMapper<string[], IOrder> {
  //T=string[] U=Order
  constructor(private itemMapper: IMapper<string[], IItem>) {} //T=string[] U=IItem=>.map(T):U .reverseMap(U:T)
  map(data: string[]): IOrder {
    const mappedItem = this.itemMapper.map(data);
    return new OrderBuilder()
      .setItem(mappedItem)
      .setId(String(data[0]))
      .setPrice(Number(data[15]))
      .setQuantity(Number(data[16]))
      .build();
  }
  reverseMap(data: IOrder): string[] {
    const reversedItem = this.itemMapper.reverseMap(data.getItem());
    return [
      data.getId(),
      ...reversedItem,
      data.getPrice().toString(),
      data.getQuantity().toString(),
    ];
  }
}
