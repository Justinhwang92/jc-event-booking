import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewCarInput } from './dto/new-car.input';
import { Car } from './entities/car';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  public async getAllCars(): Promise<Car[]> {
    return await this.carRepository.find({}).catch((error) => {
      throw new InternalServerErrorException();
    });
  }

  public async addCar(newCarData: NewCarInput): Promise<Car> {
    const newCar = this.carRepository.create(newCarData);
    return await this.carRepository.save(newCar).catch((error) => {
      throw new InternalServerErrorException();
    });
  }

  public async updateCar(id: string, newCarData: NewCarInput): Promise<Car> {
    const car = await this.carRepository.findOne(id);
    if (!car) {
      throw new InternalServerErrorException();
    }

    const updatedCar = Object.assign(car, newCarData);
    return await this.carRepository.save(updatedCar).catch((error) => {
      throw new InternalServerErrorException();
    });
  }

  public async deleteCar(id: string): Promise<Car> {
    const car = await this.carRepository.findOne(id);
    if (!car) {
      throw new InternalServerErrorException();
    }

    return await this.carRepository.remove(car).catch((error) => {
      throw new InternalServerErrorException();
    });
  }
}
