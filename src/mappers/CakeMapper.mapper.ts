import { CakeBuilder } from "../builders/cake.builder";
import { IMapper } from "../interface/IMapper.interface";
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
} from "../model/cake.model";

export class CakeMapper implements IMapper<string[], Cake> {
  map(data: string[]): Cake {
    return new CakeBuilder()
      .setType(data[1] as CakeType)
      .setFlavor(data[2] as CakeFlavor)
      .setFilling(data[3] as CakeFilling)
      .setSize(Number(data[4]) as CakeSize)
      .setLayers(Number(data[5]) as NumberOfLayers)
      .setFrostingType(data[6] as FrostingType)
      .setFrostingFlavor(data[7] as FrostingFlavor)
      .setDecorationType(data[8] as string)
      .setDecorationColor(data[9] as DecorationColor)
      .setCustomMessage(data[10] as string)
      .setShape(data[11] as CakeShape)
      .setAllergies(data[12] as Allergies)
      .setSpecialIngredients(data[13] as string)
      .setPackagingType(data[14] as CakePackagingType)
      .build();
  }
}
