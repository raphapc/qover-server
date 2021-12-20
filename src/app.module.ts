import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { InsuranceModule } from './insurance/insurance.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CarsModule, InsuranceModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
