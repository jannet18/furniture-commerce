import React from 'react';
import ProductCard from './ProductCard';
import useGetData from '../../firebase/useGetData';

const ProductsList = () => {

const { data: productsData, loading } = useGetData("products");


  return (
    <>
   {
    loading? <h5>Loading...</h5> : <>
    {
      productsData && productsData?.map((product, id) => (
        <ProductCard product={product} key={id} />
      ))
    }
     </>
   }
  
      
    </>
  )
}

export default ProductsList