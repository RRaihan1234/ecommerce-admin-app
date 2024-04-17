'use client';
import {useState, useEffect} from 'react';
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { productSchema } from "../schemas/index";

import Topbar from '../components/Topbar';


const initialValues = {
  productName: "",
  productCompany: "",
  madeIn: "",
};



export default function AdminProducts(){
    const [showProductAddForm, setShowProductAddForm] = useState(false);
    const [showProductAddBtn, setShowProductAddBtn] = useState(true);
    const [products, setProducts] = useState([]);

    const router = useRouter();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: productSchema,
      onSubmit: async (values, action) => {
        await axios.post("/api/product/new", {
          productName : values.productName,
          productCompany : values.productCompany,
          madeIn : values.madeIn,
        });
        action.resetForm();
        setShowProductAddBtn(true);
        setShowProductAddForm(false);
        getProducts();
        //window.location.reload();
      },
    });

    const getProducts = async () => {
      let res = await axios.get("/api/product");
      setProducts(res.data.reverse());
    }

    useEffect(()=>{
      window.location.reload();
  },[products])

    useEffect(()=>{
        getProducts();
    },[])

    useEffect(()=>{
      let jwt = localStorage.getItem("jwt_token");
      if(!jwt){
        router.push('/login')
      }
    },[router])

    const handleShowAddBtnClick = () => {
      setShowProductAddForm(true);
      setShowProductAddBtn(false);
    }
    
    const handleCancelClick = () => {
      setShowProductAddForm(false);
      setShowProductAddBtn(true);
    }

    const handleProductDetailInfo = (id) => {
      let newProducts = products.map((product)=>{
        if(product._id===id){
           product.productDetails = true;
        }
        return product;
      })
      setProducts(newProducts)
    }

    const handleSummaryClick = (id) => {
      let newProducts = products.map((product)=>{
        if(product._id===id){
           product.productDetails = false;
        }
        return product;
      })
      setProducts(newProducts)
    }

  return (
    <>
      <Topbar />
      {showProductAddBtn && <div className="flex items-center justify-center mt-[5rem]">
         <button onClick={handleShowAddBtnClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Product to The Product List</button>
      </div>}
      
      {showProductAddForm && <div className='flex flex-col items-center mt-[5rem]'>
        <div className='flex flex-col items-center p-5 bg-blue-300 border-4 border-blue-500 rounded-3xl'>
        <h1 className="font-bold text-xl mb-3">Product Addition Form</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-2 px-2">
                        <label htmlFor="productName" className='mr-2 font-medium'>
                        Product Name :
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        type="string"
                        autoComplete="off"
                        name="productName"
                        id="productName"
                        placeholder="Enter Product Name"
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.productName && touched.productName ? (
                        <p className="text-red-500 font-medium text-center">{errors.productName}</p>
                        ) : null}
                    </div>
                    <div className="mb-2 px-2">
                        <label htmlFor="productCompany" className='mr-2 text-black-500 font-medium'>
                         Company Name :  
                        </label>
                        <input
                        type="string"
                        className="outline-4 outline-green-500 rounded p-1"
                        autoComplete="off"
                        name="productCompany"
                        id="productCompany"
                        placeholder="Enter Company Name"
                        value={values.productCompany}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.productCompany && touched.productCompany ? (
                        <p className='text-red-500 font-medium text-center'>{errors.productCompany}</p>
                        ) : null}
                    </div>
                    <div className="mb-2 px-2">
                        <label htmlFor="madeIn" className='mr-2 font-medium'>
                        Made IN :
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        type="string"
                        autoComplete="off"
                        name="madeIn"
                        id="madeIn"
                        placeholder="Enter Country Name"
                        value={values.madeIn}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.madeIn && touched.madeIn ? (
                        <p className="text-red-500 font-medium text-center">{errors.madeIn}</p>
                        ) : null}
                    </div>
                    <div className="flex flex-col items-center">
                      <button type="submit" className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add product</button>
                      <button type="button" onClick={handleCancelClick} className="w-10/12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cancel</button>
                    </div>
                    </form>
        </div>
    </div>}

    <div className="flex items-center justify-center mt-[5rem]">
         <p className="text-blue-500 font-bold text-xl px-5 py-2.5 me-2 mb-2">Product List</p>
    </div>
    
    <div className='flex items-center justify-center'>
      <div className="flex justify-between mt-[1rem] w-2/5">
               <div className="font-bold">Product Name</div>       
      </div>
    </div>
    
    
    {products?.map((product)=>{
      return <div key={product._id}>
                  <div className='flex items-center justify-center'>
                      <div className="flex justify-between mt-[0.5rem] w-2/5">
                              <div className="flex items-center justify-center"><div>{product.productName}</div></div>
                              <div className="">
                                  <button onClick={()=>handleProductDetailInfo(product._id)} className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Details</button>
                                </div>       
                      </div>
                 </div>
                {product.productDetails && <div className='flex items-center justify-center mb-[5rem]'>
                  <div className="flex justify-between mt-[0.5rem] w-2/5">
                          <div className="flex items-center justify-center"><div className="font-medium">Name : {product.productName}, Company : {product.productCompany}, Made IN : {product.madeIn}</div></div>
                          <div className="">
                              <button onClick={()=>handleSummaryClick(product._id)} className="w-10/12 text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Summary</button>
                            </div>       
                  </div>
              </div>}
            </div>
    })}
    
   
            
    </>
  );
}
