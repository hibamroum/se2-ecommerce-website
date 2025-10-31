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
  const cake = new Cake(
    CakeType.SPONGE,
    CakeFlavor.VANILLA,
    CakeFilling.CREAM,
    CakeSize.TWENTY,
    NumberOfLayers.TWO,
    FrostingType.BUTTER_CREAM,
    FrostingFlavor.VANILLA,
    "Sprinkles",
    DecorationColor.MULTI_COLOR,
    "Happy Birthday",
    CakeShape.ROUND,
    Allergies.NUT_FREE,
    "Organic Ingredients",
    CakePackagingType.STANDARD_BOX
  );
  const order = new Order("1", cake, 50, 1);//Applying Polymorphism. item of type IItem will be the cake since Cake implements IItem 
};
main();
