import { createSelector } from 'reselect';
import { IRootAppState } from '../../../typings/index';

const selectHomePage = (state: IRootAppState) => state.homePage;

// Select topCars from the state
export const makeSelectTopCars = createSelector(
  selectHomePage,
  (homePageState) => homePageState.topCars
);
