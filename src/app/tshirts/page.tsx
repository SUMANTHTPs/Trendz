"use client"

import React, { useEffect } from 'react';
import ProductTile from '../components/ProductTile';
import { useDispatch } from 'react-redux';
import { getProduct } from '@/redux/features/productSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';

function TShirts() {
  const { tShirts } = useAppSelector(store => store.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProduct());
  }, []);
  
  const shirtArray = Object?.values(tShirts);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap -m-4 gap-5 justify-center">
          {shirtArray?.map((shirt: any) => {
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
