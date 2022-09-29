import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class NewCarInput {
  @Field()
  name: string;

  @Field((type) => Int)
  @Max(1000, { message: 'Daily price must be less than $1000' })
  @Min(10, { message: 'Daily price must be greater than $10' })
  dailyPrice: number;

  @Field((type) => Int)
  @Max(20000, { message: 'Monthly price must be less than $20000' })
  @Min(1500, { message: 'Monthly price must be greater than $1500' })
  monthlyPrice: number;

  @Field()
  mileage: string;

  @Field()
  gas: string;

  @Field()
  gearType: string;

  @Field()
  thumbnailUrl: string;
}
