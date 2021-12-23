import { Body, Controller, Post } from '@nestjs/common';
import { InsuranceService } from './insurance.service';

@Controller('insurance')
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) { }

  @Post('/plans')
  public async calculate(@Body() body: any): Promise<any> {
    return this.insuranceService.getInsurancePlans(body.params);
  }
}
