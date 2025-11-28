import { AgeGroup, Bool, Material, Toy, ToyType } from "../model/toy.model";

export class ToyBuilder {
  private type!: ToyType;
  private ageGroup!: AgeGroup;
  private brand!: string;
  private material!: Material;
  private batteryRequired!: Bool;
  private educational!: Bool;

  setToyType(type: ToyType): ToyBuilder {
    this.type = type;
    return this;
  }
  setAgeGroup(ageGroup: AgeGroup): ToyBuilder {
    this.ageGroup = ageGroup;
    return this;
  }
  setBrand(brand: string): ToyBuilder {
    this.brand = brand;
    return this;
  }
  setMaterial(material: Material): ToyBuilder {
    this.material = material;
    return this;
  }
  setBatteruRequired(batteryRequired: Bool): ToyBuilder {
    this.batteryRequired = batteryRequired;
    return this;
  }
  setEducational(educational: Bool): ToyBuilder {
    this.educational = educational;
    return this;
  }
  build(): Toy {
    return new Toy(
      this.type,
      this.ageGroup,
      this.brand,
      this.material,
      this.batteryRequired,
      this.educational
    );
  }
}
