"use client"

import React, { useEffect } from 'react';
import ProductTile from '../components/ProductTile';
import { useDispatch } from 'react-redux';
import { getProduct } from '@/redux/features/productSlice';
import { ThunkDispatch } from 'redux-thunk';
import { useAppSelector } from '@/redux/store';

function TShirts() {
  const { tShirts } = useAppSelector(store => store.productReducer);
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);
  
  const shirtArray = Object.values(tShirts);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap -m-4 gap-5 justify-center">
          {shirtArray.map((shirt: any) => {
            return (
              <ProductTile key={shirt.slug} product={shirt} />
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default TShirts;
