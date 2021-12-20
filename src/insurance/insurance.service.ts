import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class InsuranceService {
  constructor(private carsService: CarsService) { }

  private _plans = [
    {
      id: 1,
      title: 'Global',
      price: { yearly: 0, monthly: 0 },
      maxDuration: '90',
      medicalExpanse: '1.000.000',
      personalAssistance: '5.000',
      travelAssistance: '1.000',
      coverageDuration: '1',
    },
    {
      id: 2,
      title: 'Universe',
      price: { yearly: 0, monthly: 0 },
      maxDuration: '180',
      medicalReimbursement: '3.000.000',
      personalAssistance: '10.000',
      travelInsurance: '2.500',
      coverageDuration: '1',
    },
  ];
  private _idGlobal = 1;
  private _idUniverse = 2;

  public async getInsurancePlans({ userAge, maker, carValue }) {

    if (Number(carValue) < 5000) {
      throw new HttpException(
        'Sorry! The price of the car is too low',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (Number(userAge) < 18) {
      throw new HttpException(
        'Sorry! The driver is too young',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (maker.toUpperCase() === 'PORSCHE' && userAge < 25) {
      throw new HttpException(
        'Sorry! We can not accept this particular risk',
        HttpStatus.BAD_REQUEST,
      );
    }
    const car = await this.carsService.findByMaker(maker);

    const updatedPlans = this._plans.map((plan) => {
      if (plan.id === this._idGlobal) {
        plan.price.yearly = car.globalPrice;
        plan.price.monthly = (car.globalPrice / 12);
      } else {
        plan.price.yearly = (
          car.globalPrice +
          (car.globalPrice * car.universalPercentage) / 100
        )
        plan.price.monthly = (
          car.globalPrice + (carValue * car.universalPercentage) / 100) / 12
      }
      return plan;
    });

    return updatedPlans;
  }
}
