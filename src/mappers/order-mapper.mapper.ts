import { OrderBuilder } from "../builders/order.builder";
import { IItem } from "../interface/IItem.interface";
import { IMapper } from "../interface/IMapper.interface";
import { IOrder } from "../interface/IOrder.interface";
//for XMLOrderMapper.map() to ensure data will have the keys I'm setting the returned order to.
//for XMLOrderMapper.reverseMap() to ensure return object will have the keys I'm setting the returned order to.
export type xmlOrderObject = {
  OrderID: string;
  Price: number;
  Quantity: number;
};

export class CSVOrderMapper implements IMapper<string[], IOrder> {
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

export class XMLOrderMapper implements IMapper<xmlOrderObject, IOrder> {
  constructor(private itemMapper: IMapper<object, IItem>) {}

  map(data: xmlOrderObject): IOrder {
    const mappedItem = this.itemMapper.map(data);
    return new OrderBuilder()
      .setId(data.OrderID)
      .setItem(mappedItem)
      .setPrice(data.Price)
      .setQuantity(data.Quantity)
      .build();
  }
  reverseMap(data: IOrder): xmlOrderObject {
    return {
      OrderID: data.getId(),
      ...this.itemMapper.reverseMap(data.getItem()),
      Price: data.getPrice(),
      Quantity: data.getPrice(),
    };
  }
}
