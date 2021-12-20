import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './model/car';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) { }

  @Get()
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  // @Get(':maker')
  // findByMaker(@Param() params): Promise<Car> {
  //   const { maker } = params;
  //   return this.carsService.findByMaker(maker);
  // }
}
