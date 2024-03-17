import React from 'react'
//import { products } from '../data/products';
import { useEffect } from 'react';
import { ProductComponent } from './ProductComponent';
import { useQuery } from '@tanstack/react-query';
import Axios from "axios";
import { useContext } from 'react';
import { ProductsContext } from '../App';

export const AmazonContent = () => {

  const {products} = useContext(ProductsContext);
   
  return (
    <div className='main'>
        <div className='products-grid'>
          {products.map((product) =>(  
            <ProductComponent  product={product} key={product.id}/>)
          )
          }
           {/*implicit return */}
          </div>
    </div>
  );
}

