'use client';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation'

import Topbar from '../components/Topbar';
import { Orders } from '../../utils/order-database';


export default function AdminOrders(){
    const [orders, setOrders] = useState(Orders);

    const router = useRouter();

    useEffect(()=>{
      let jwt = localStorage.getItem("jwt_token");
      if(!jwt){
        router.push('/login')
      }
    },[router])

    const handleOrderDetailInfo = (id) => {
      let newOrders = orders.map((order)=>{
        if(order.id===id){
           order.orderDetails = true;
        }
        return order;
      })
      setOrders(newOrders);
    }

    const handleSummaryClick = (id) => {
      let newOrders = orders.map((order)=>{
        if(order.id===id){
           order.orderDetails = false;
        }
        return order;
      })
      setOrders(newOrders);
    }

  return (
    <>
      <Topbar />
      
    <div className="flex items-center justify-center mt-[5rem]">
         <p className="text-blue-500 font-bold text-xl px-5 py-2.5 me-2 mb-2">Order List</p>
    </div>
    
    <div className='flex items-center justify-center'>
      <div className="flex justify-between mt-[1rem] w-2/5">
               <div className="font-bold">Ordered Product</div>       
      </div>
    </div>
    
    
    {orders.map((order)=>{
      return <div key={order.id}>
                  <div className='flex items-center justify-center'>
                      <div className="flex justify-between mt-[0.5rem] w-2/5">
                              <div className="flex items-center justify-center"><div>{order.orderedProduct}</div></div>
                              <div className="">
                                  <button onClick={()=>handleOrderDetailInfo(order.id)} className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Details</button>
                                </div>       
                      </div>
                 </div>
                {order.orderDetails && <div className='flex items-center justify-center mb-[5rem]'>
                  <div className="flex justify-between mt-[0.5rem] w-2/5">
                          <div className="flex items-center justify-center"><div className="font-medium">Ordered Product : {order.orderedProduct}, Quantity : {order.quantity}, Discount : {order.discount}</div></div>
                          <div className="">
                              <button onClick={()=>handleSummaryClick(order.id)} className="w-10/12 text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Summary</button>
                            </div>       
                  </div>
              </div>}
            </div>
    })}
    
   
            
    </>
  );
}
