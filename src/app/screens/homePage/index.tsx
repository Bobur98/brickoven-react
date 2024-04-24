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
import { setPopularDishes } from './slice';
import { Product } from '../../../lib/types/products';
import ProductService from '../../services/ProductService';
import { ProductCollection } from '../../../lib/enums/product.enum';

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  // 2. setPopularDishes reducer ikta argument qabul qiladi ln biz bita parameter jonatyabmiz?
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

export default function HomePage() {
  // 3. useDispatch() actionDispatchdagi dispatch argumentmi?
  // Selector: Store => Data
  const { setPopularDishes } = actionDispatch(useDispatch());
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    // Backend server data request => Data
    const products = new ProductService();

    products
      .getProducts({
        order: 'productViews',
        page: 1,
        limit: 4,
        productCollection: ProductCollection.DRINK,
      })
      .then((data) => {
        console.log('data passed here');

        setPopularDishes(data);
      })
      .catch((err) => {
        console.log('**********');

        console.log(err);
      });
    // Slice: Data => Store
    // @ts-ignore
  }, []);

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
