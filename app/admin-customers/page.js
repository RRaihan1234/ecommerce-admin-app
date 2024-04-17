'use client';
import {useState, useEffect} from 'react';
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { customerSchema } from "../schemas/index";

import Topbar from '../components/Topbar';


const initialValues = {
  customerMobile: "",
  customerName: "",
  customerAddress: "",
};



export default function AdminCustomers(){
    const [showCustomerAddForm, setShowCustomerAddForm] = useState(false);
    const [showCustomerAddBtn, setShowCustomerAddBtn] = useState(true);
    const [customers, setCustomers] = useState([]);

    const router = useRouter();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: customerSchema,
      onSubmit: async (values, action) => {
        await axios.post("/api/customer/new", {
          customerMobile : values.customerMobile,
          customerAddress : values.customerAddress,
          customerName : values.customerName,
        });
        action.resetForm();
        setShowCustomerAddBtn(true);
        setShowCustomerAddForm(false);
        getCustomers();
        window.location.reload();
      },
    });

    const getCustomers = async () => {
      let res = await axios.get("/api/customer");
      setCustomers(res.data.reverse());
    }

    useEffect(()=>{
        getCustomers();
    },[])

    useEffect(()=>{
      let jwt = localStorage.getItem("jwt_token");
      if(!jwt){
        router.push('/login')
      }
    },[router])

    const handleShowAddBtnClick = () => {
      setShowCustomerAddForm(true);
      setShowCustomerAddBtn(false);
    }
    
    const handleCancelClick = () => {
      setShowCustomerAddForm(false);
      setShowCustomerAddBtn(true);
    }

    const handleCustomerDetailInfo = (id) => {
      let newCustomers = customers.map((customer)=>{
        if(customer._id===id){
           customer.customerDetails = true;
        }
        return customer;
      })
      setCustomers(newCustomers)
    }

    const handleSummaryClick = (id) => {
      let newCustomers = customers.map((customer)=>{
        if(customer._id===id){
           customer.customerDetails = false;
        }
        return customer;
      })
      setCustomers(newCustomers)
    }

  return (
    <>
      <Topbar />
      {showCustomerAddBtn && <div className="flex items-center justify-center mt-[5rem]">
         <button onClick={handleShowAddBtnClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Customer to The Customer List</button>
      </div>}
      
      {showCustomerAddForm && <div className='flex flex-col items-center mt-[5rem]'>
        <div className='flex flex-col items-center p-5 bg-blue-300 border-4 border-blue-500 rounded-3xl'>
        <h1 className="font-bold text-xl mb-3">Customer Addition Form</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-2 px-2">
                        <label htmlFor="customerName" className='mr-2 font-medium'>
                        Customer Name :
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        type="string"
                        autoComplete="off"
                        name="customerName"
                        id="customerName"
                        placeholder="Enter Customer Name"
                        value={values.customerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.customerName && touched.customerName ? (
                        <p className="text-red-500 font-medium text-center">{errors.customerName}</p>
                        ) : null}
                    </div>
                    <div className="mb-2 px-2">
                        <label htmlFor="customerMobile" className='mr-2 text-black-500 font-medium'>
                         Bangladeshi Mobile Number : 
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        autoComplete="off"
                        name="customerMobile"
                        id="customerMobile"
                        placeholder="Enter Mobile Number"
                        value={values.customerMobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.customerMobile && touched.customerMobile ? (
                        <p className='text-red-500 font-medium text-center'>{errors.customerMobile}</p>
                        ) : null}
                    </div>
                    <div className="mb-2 px-2">
                        <label htmlFor="customerAddress" className='mr-2 font-medium'>
                        Customer Address :
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        type="string"
                        autoComplete="off"
                        name="customerAddress"
                        id="customerAddress"
                        placeholder="Enter Customer Address"
                        value={values.customerAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.customerAddress && touched.customerAddress ? (
                        <p className="text-red-500 font-medium text-center">{errors.customerAddress}</p>
                        ) : null}
                    </div>
                    <div className="flex flex-col items-center">
                      <button type="submit" className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Customer</button>
                      <button type="button" onClick={handleCancelClick} className="w-10/12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cancel</button>
                    </div>
                    </form>
        </div>
    </div>}

    <div className="flex items-center justify-center mt-[5rem]">
         <p className="text-blue-500 font-bold text-xl px-5 py-2.5 me-2 mb-2">Customer List</p>
    </div>
    
    <div className='flex items-center justify-center'>
      <div className="flex justify-between mt-[1rem] w-2/5">
               <div className="font-bold">Customer Name</div>       
      </div>
    </div>
    
    
    {customers?.map((customer)=>{
      return <div key={customer._id}>
                  <div className='flex items-center justify-center'>
                      <div className="flex justify-between mt-[0.5rem] w-2/5">
                              <div className="flex items-center justify-center"><div>{customer.customerName}</div></div>
                              <div className="">
                                  <button onClick={()=>handleCustomerDetailInfo(customer._id)} className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Details</button>
                                </div>       
                      </div>
                 </div>
                {customer.customerDetails && <div className='flex items-center justify-center mb-[5rem]'>
                  <div className="flex justify-between mt-[0.5rem] w-2/5">
                          <div className="flex items-center justify-center"><div className="font-medium">Name : {customer.customerName}, Mobile : {customer.customerMobile}, Address : {customer.customerAddress}</div></div>
                          <div className="">
                              <button onClick={()=>handleSummaryClick(customer._id)} className="w-10/12 text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Summary</button>
                            </div>       
                  </div>
              </div>}
            </div>
    })}
    
   
            
    </>
  );
}
