import { CakeBuilder } from "./builders/cake.builder";
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
} from "./model/cake.model";
import { Order } from "./model/order.model";

const main = async () => {
  const cake = new CakeBuilder()
    .setType(CakeType.SPONGE)
    .setFlavor(CakeFlavor.VANILLA)
    .setFilling(CakeFilling.CREAM)
    .setSize(CakeSize.TWENTY)
    .setLayers(NumberOfLayers.TWO)
    .setFrostingType(FrostingType.BUTTER_CREAM)
    .setFrostingFlavor(FrostingFlavor.VANILLA)
    .setDecorationType("Sprinkles")
    .setDecorationColor(DecorationColor.MULTI_COLOR)
    .setCustomMessage("Happy Birthday")
    .setShape(CakeShape.ROUND)
    .setAllergies(Allergies.NUT_FREE)
    .setSpecialIngredients("Organic Ingredients")
    .setPackagingType(CakePackagingType.STANDARD_BOX)
    .build();
  console.log("Created Cake: ", cake);
};
main();
