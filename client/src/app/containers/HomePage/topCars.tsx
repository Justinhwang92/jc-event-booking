import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Car } from '../../components/car';
import { ICar } from '../../../typings/car';
import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../components/responsive';
import carService from '../../services/carService';
import { GetCars_cars } from '../../services/carService/__generated__/GetCars';
import { setTopCars } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { makeSelectTopCars } from './selectors';
import MoonLoader from 'react-spinners/MoonLoader';

const TopCarsContainer = styled.div`
  ${tw`
    max-w-screen-lg
    w-full
    flex
    flex-col
    items-center
    justify-center
    pr-4
    pl-4
    md:pl-0
    md:pr-0
    mb-10
  `};
`;

const Title = styled.h2`
  ${tw`
    text-3xl
    lg:text-5xl
    text-black
    font-extrabold
  `};
`;

const CarsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
  `};
`;

const EmptyCars = styled.div`
  ${tw`
    w-full
    flex
    justify-center
    items-center
    text-sm
    text-gray-500
  `};
`;

const LoadingContainer = styled.div`
  ${tw`
    w-full
    flex
    justify-center
    items-center
    text-base
    text-black
    mt-9
  `};
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars)),
});

const stateSelector = createSelector(makeSelectTopCars, (topCars) => ({
  topCars,
}));

// for spinner testing
const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export function TopCars() {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // for mobile devices
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  const { topCars } = useSelector(stateSelector); // get top cars from redux store
  const { setTopCars } = actionDispatch(useDispatch()); // set top cars in redux store

  // Fetch cars from the server
  const fetchTopCars = async () => {
    setIsLoading(true);
    const cars = await carService.getCars().catch((err) => {
      console.log('Error: ' + err);
    });

    // for spinner testing
    // await wait(5000);

    // console.log('Cars: ' + cars);
    if (cars) setTopCars(cars);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTopCars();
  }, []);

  const isTopCarsEmpty = !topCars || topCars.length === 0;
  const cars =
    (!isTopCarsEmpty &&
      topCars.map((car) => <Car {...car} thumbnailSrc={car.thumbnailUrl} />)) ||
    [];

  // Test Cases
  // const testCar: ICar = {
  //   name: 'Audi S3 Car',
  //   mileage: '10k',
  //   thumbnailSrc:
  //     'https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg',
  //   dailyPrice: 70,
  //   monthlyPrice: 1600,
  //   gearType: 'Auto',
  //   gas: 'Petrol',
  // };

  // const testCar2: ICar = {
  //   name: 'HONDA cITY 5 Seater Car',
  //   mileage: '20k',
  //   thumbnailSrc:
  //     'https://shinewiki.com/wp-content/uploads/2019/11/honda-city.jpg',
  //   dailyPrice: 50,
  //   monthlyPrice: 1500,
  //   gearType: 'Auto',
  //   gas: 'Petrol',
  // };
  // const cars = [
  //   <Car {...testCar} />,
  //   <Car {...testCar2} />,
  //   <Car {...testCar} />,
  //   <Car {...testCar2} />,
  //   <Car {...testCar} />,
  // ];

  const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 3);

  return (
    <TopCarsContainer>
      <Title>Explore Our Top Deals</Title>
      {isLoading && (
        <LoadingContainer>
          <MoonLoader loading size={40} />
        </LoadingContainer>
      )}
      {isTopCarsEmpty && !isLoading && <EmptyCars>No cars to show.</EmptyCars>}
      {!isTopCarsEmpty && (
        <CarsContainer>
          <Carousel
            value={current}
            onChange={setCurrent}
            slides={cars}
            plugins={[
              'clickToChange',
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 3,
                },
              },
            ]}
            // Depends on display size
            breakpoints={{
              640: {
                plugins: [
                  {
                    resolve: slidesToShowPlugin,
                    options: {
                      numberOfSlides: 1,
                    },
                  },
                ],
              },
              900: {
                plugins: [
                  {
                    resolve: slidesToShowPlugin,
                    options: {
                      numberOfSlides: 2,
                    },
                  },
                ],
              },
            }}
          />
          <Dots
            value={current}
            onChange={setCurrent}
            number={isMobile ? cars.length : numberOfDots}
          />
        </CarsContainer>
      )}
    </TopCarsContainer>
  );
}
