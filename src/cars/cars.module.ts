import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { InsuranceService } from '../insurance/insurance.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, InsuranceService],
})
export class CarsModule { }
