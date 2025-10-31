import { IItem } from "./IItem.interface";

export interface IOrder {
  getId(): string;
  getItem(): IItem;
  getQuantity(): number;
  getPrice(): number;
}
