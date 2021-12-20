import { Injectable } from '@nestjs/common';
import { Car } from './model/car';

@Injectable()
export class CarsService {
  constructor() { }

  private _cars: Car[] = [
    new Car(1, 'BMW', 150, 0.4),
    new Car(2, 'AUDI', 250, 0.3),
    new Car(3, 'PORSCHE', 500, 0.7),
  ];

  async findByMaker(maker: string): Promise<Car> {
    return this._cars.find((car) => car.maker.toUpperCase() === maker.toUpperCase())
  }

  async findAll(): Promise<Car[]> {
    return this._cars;
  }
}
