import { Module } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';

@Module({
  controllers: [InsuranceController],
  providers: [InsuranceService, CarsService]
})
export class InsuranceModule { }
