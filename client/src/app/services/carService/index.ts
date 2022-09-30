import { GetCars_cars } from './__generated__/GetCars';
import { apolloClient } from '../../graphql';
import { GET_ALL_CARS } from './queries';

class CarService {
  public async getCars(): Promise<GetCars_cars[]> {
    // get all cars from the server
    const response = await apolloClient
      .query({ query: GET_ALL_CARS })
      .catch((error) => {
        throw error;
      });

    if (response && response.data) {
      // console.log(response.data);
      return response.data as GetCars_cars[];
    }

    return [];
  }
}

export default new CarService();
