"use client"

import React, { useEffect } from 'react';
import ProductTile from '../components/ProductTile';
import { useDispatch } from 'react-redux';
import { getProduct } from '@/redux/features/productSlice';
import { ThunkDispatch } from 'redux-thunk';
import { useAppSelector } from '@/redux/store';

function Hoodies() {
  const { hoodies } = useAppSelector(store => store.product);
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const hoodiesArray = Object?.values(hoodies);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap flex-grow -m-4 gap-5 justify-center">
          {hoodiesArray?.map((hoodie: any) => {
            return (
              <ProductTile key={hoodie.slug} product={hoodie} />
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default Hoodies;
