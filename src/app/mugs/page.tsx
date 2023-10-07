"use client"

import React, { useEffect } from 'react';
import ProductTile from '../components/ProductTile';
import { useDispatch } from 'react-redux';
import { getProduct } from '@/redux/features/productSlice';
import { ThunkDispatch } from 'redux-thunk';
import { useAppSelector } from '@/redux/store';

function Mugs() {
  const { mugs } = useAppSelector(store => store.product);
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const mugsArray = Object?.values(mugs);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap -m-4 gap-5 justify-center">
          {mugsArray?.map((mug: any) => {
            return (
              <ProductTile key={mug.slug} product={mug} />
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default Mugs;
