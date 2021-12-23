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
      medicalExpanse: '3.000.000',
      personalAssistance: '10.000',
      travelAssistance: '2.500',
      coverageDuration: '1',
    },
  ];

  private _idGlobal = 1;

  public async getInsurancePlans({ age, makerId, purchasePrice }) {

    const errors = [];
    if (Number(purchasePrice) < 5000) {
      errors.push({
        key: 'purchasePrice',
        message: 'Sorry! The price of the car is too low'
      });
    }
    if (Number(age) < 18) {
      errors.push(
        {
          key: 'age',
          message: 'Sorry! The driver is too young'
        });
    }

    const car = await this.carsService.findById(makerId);

    if (!car) {
      errors.push(
        {
          key: 'maker',
          message: 'Sorry! Select a Maker'
        });
    }

    if (car.maker === 'PORSCHE' && age < 25) {
      errors.push(
        {
          key: 'highRisk',
          message: 'Sorry! We can not accept this particular risk'
        });
    }

    if (errors.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedPlans = this._plans.map((plan) => {
      if (plan.id === this._idGlobal) {
        plan.price.yearly = car.globalPrice;
        plan.price.monthly = (car.globalPrice / 12);
      } else {
        plan.price.yearly = (
          car.globalPrice +
          (purchasePrice * car.universalPercentage) / 100
        )
        plan.price.monthly = (
          car.globalPrice + (purchasePrice * car.universalPercentage) / 100) / 12
      }
      return plan;
    });

    return updatedPlans;
  }
}
