import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewCarInput {
  @Field()
  name: string;

  @Field((type) => Number)
  dailyPrice: number;

  @Field((type) => Number)
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
