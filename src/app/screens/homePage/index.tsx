import React, { useEffect } from 'react';
import ActiveUsers from './ActiveUsers';
import Advertisement from './Advertisement';
import Events from './Events';
import NewDishes from './NewDishes';
import PopularDishes from './PopularDishes';
import Statistics from './Statistics';
import '../../../css/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { setPopularDishes } from './slice';
import { retrievePopularDishes } from './selector';
import { Product } from '../../../lib/types/products';
import { log } from 'console';

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  // 2. setPopularDishes reducer ikta argument qabul qiladi ln biz bita parameter jonatyabmiz?
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);
export default function HomePage() {
  // 3. useDispatch() actionDispatchdagi dispatch argumentmi?
  // Selector: Store => Data
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);

  useEffect(() => {
    // Backend server data request => Data
    const result = [
      {
        _id: '65fc6a604148f56316eb407e',
        productStatus: 'PROCESS',
        productCollection: 'DRINK',
        productName: 'Orange Juice 2',
        productPrice: 4,
        productLeftCount: 40,
        productSize: 'NORMAL',
        productVolume: 1.2,
        productDesc: '555',
        productImages: [
          'uploads/products/e7580d8d-898c-4919-a388-8870b6850d06.jpg',
        ],
        productViews: 0,
        createdAt: '2024-03-21T17:12:00.024Z',
        updatedAt: '2024-04-12T06:13:16.551Z',
        __v: 0,
      },
      {
        _id: '65fc6a3f4148f56316eb407b',
        productStatus: 'PROCESS',
        productCollection: 'DRINK',
        productName: 'Orange Juice 2',
        productPrice: 4,
        productLeftCount: 40,
        productSize: 'NORMAL',
        productVolume: 0.5,
        productDesc: '444',
        productImages: [
          'uploads/products/1612b7fc-0b36-4f3c-a2b8-a615ed2c4b44.jpg',
        ],
        productViews: 2,
        createdAt: '2024-03-21T17:11:27.363Z',
        updatedAt: '2024-04-12T11:52:48.191Z',
        __v: 0,
      },
    ];
    // Slice: Data => Store
    // @ts-ignore

    setPopularDishes(result);
  }, []);

  //   console.log(popularDishes);

  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
