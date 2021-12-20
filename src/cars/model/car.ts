export class Car {
  constructor(id: number, maker: string, globalPrice: number, universalPercentage: number) {
    this._id = id;
    this._maker = maker;
    this._globalPrice = globalPrice;
    this._universalPercentage = universalPercentage;
  }

  private _id: number;
  private _maker: string;
  private _globalPrice: number;
  private _universalPercentage: number;


  public get id(): number {
    return this._id;
  }
  public get maker(): string {
    return this._maker;
  }
  public get globalPrice(): number {
    return this._globalPrice;
  }
  public get universalPercentage(): number {
    return this._universalPercentage;
  }

}
