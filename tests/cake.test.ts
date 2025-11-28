import { CakeBuilder } from "../src/builders/cake.builder";
import { OrderBuilder } from "../src/builders/order.builder";
import { CakeOrderRepository } from "../src/repository/file/cake-order.repository";
import {
  Allergies,
  Cake,
  CakeFilling,
  CakeFlavor,
  CakePackagingType,
  CakeShape,
  CakeSize,
  CakeType,
  DecorationColor,
  FrostingFlavor,
  FrostingType,
  NumberOfLayers,
} from "../src/model/cake.model";

import config from "../src/config";
import path from "path";
describe("Cake Order Test Suite", () => {
  it("Should add a new cake order", async () => {
    //Assert
    const newCake = new CakeBuilder()
      .setType(CakeType.FRUIT)
      .setFlavor(CakeFlavor.JAM)
      .setFilling(CakeFilling.CREAM)
      .setSize(CakeSize.EIGHT)
      .setLayers(NumberOfLayers.ONE)
      .setFrostingType(FrostingType.WHIPED_CREAM)
      .setFrostingFlavor(FrostingFlavor.CREAM)
      .setDecorationType("Sprinkles")
      .setDecorationColor(DecorationColor.MULTI_COLOR)
      .setCustomMessage("Happy Birthday")
      .setShape(CakeShape.ROUND)
      .setAllergies(Allergies.NONE)
      .setSpecialIngredients("Organic Ingredients")
      .setPackagingType(CakePackagingType.BOX)
      .build();
    const newOrder = new OrderBuilder()
      .setId("264")
      .setItem(newCake)
      .setPrice(97)
      .setQuantity(1)
      .build();

    //Act
    const savedOrder = await new CakeOrderRepository(
      path.join(__dirname, "../", "src", "data", "cake orders.csv")
    ).create(newOrder);
    //Assert
    expect(savedOrder).toBe("264"); //savedOrder will hold the returned value of create function
  });
});
