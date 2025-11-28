import { ToyBuilder } from "../builders/toy.builder";
import { IMapper } from "../interface/IMapper.interface";
import { AgeGroup, Bool, Material, Toy, ToyType } from "../model/toy.model";

type toyObject = {
  Type: ToyType;
  AgeGroup: AgeGroup;
  Brand: string;
  Material: Material;
  BatteryRequired: Bool;
  Educational: Bool;
};

export class ToyMapper implements IMapper<toyObject, Toy> {
  map(data: toyObject): Toy {
    return new ToyBuilder()
      .setToyType(data.Type)
      .setAgeGroup(data.AgeGroup)
      .setBrand(data.Brand)
      .setMaterial(data.Material)
      .setBatteruRequired(data.BatteryRequired)
      .setEducational(data.Educational)
      .build();
  }
  reverseMap(data: Toy): toyObject {
    return {
      Type: data.getToyType(),
      AgeGroup: data.getAgeGroup(),
      Brand: data.getBrand(),
      Material: data.getMaterial(),
      BatteryRequired: data.getBatteryRequired(),
      Educational: data.getEducational(),
    };
  }
}
