'use client';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation'

import Topbar from '../components/Topbar';
import { Products } from '../../utils/product-database';


export default function ProductsPage(){
    const [products, setProducts] = useState(Products);

    const router = useRouter();

    useEffect(()=>{
      let jwt = localStorage.getItem("jwt_token");
      if(!jwt){
        router.push('/login')
      }
    },[router])

    const handleProductDetailInfo = (id) => {
      let newProducts = products.map((product)=>{
        if(product.id===id){
           product.productDetails = true;
        }
        return product;
      })
      setProducts(newProducts)
    }

    const handleSummaryClick = (id) => {
      let newProducts = products.map((product)=>{
        if(product.id===id){
           product.productDetails = false;
        }
        return product;
      })
      setProducts(newProducts)
    }

  return (
    <>
      <Topbar />
      
    <div className="flex items-center justify-center mt-[5rem]">
         <p className="text-blue-500 font-bold text-xl px-5 py-2.5 me-2 mb-2">Product List</p>
    </div>
    
    <div className='flex items-center justify-center'>
      <div className="flex justify-between mt-[1rem] w-2/5">
               <div className="font-bold">Product Name</div>       
      </div>
    </div>
    
    
    {products.map((product)=>{
      return <div key={product.id}>
                  <div className='flex items-center justify-center'>
                      <div className="flex justify-between mt-[0.5rem] w-2/5">
                              <div className="flex items-center justify-center"><div>{product.productName}</div></div>
                              <div className="">
                                  <button onClick={()=>handleProductDetailInfo(product.id)} className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Details</button>
                                </div>       
                      </div>
                 </div>
                {product.productDetails && <div className='flex items-center justify-center mb-[5rem]'>
                  <div className="flex justify-between mt-[0.5rem] w-2/5">
                          <div className="flex items-center justify-center"><div className="font-medium">Name : {product.productName}, Company : {product.productCompany}, Made IN : {product.madeIn}</div></div>
                          <div className="">
                              <button onClick={()=>handleSummaryClick(product.id)} className="w-10/12 text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Summary</button>
                            </div>       
                  </div>
              </div>}
            </div>
    })}
    
   
            
    </>
  );
}
