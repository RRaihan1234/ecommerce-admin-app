"use client"
import { useFormik } from "formik";
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation'
import axios from "axios";

import HomePage from "../../app/home/page";

const initialValues = {
    mobile: "",
    password: "",
  };

function Login() {
    const router = useRouter()
    const [error, setError] = useState(false);
    const { values, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: async (values, action) => {
        let res = await axios.post("/api/login", {
            mobile : values.mobile,
            password : values.password
        })
        if(res.data.token){
           action.resetForm();
           setError(false);
           localStorage.setItem("jwt_token", res.data.token)
           window.location.reload();
           router.push('/')
        }else{
            setError(true)
        }
      },
    });

  return (
    <div className='flex flex-col items-center mt-40'>
        <h1 className="font-bold text-xl mb-5 text-blue-500">E-Commerce Admin App </h1>
        <div className='flex flex-col items-center p-5 bg-blue-300 border-4 border-blue-500 rounded-3xl'>
        <h1 className="font-bold text-xl mb-3">Login Form</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-2 px-2">
                        <label htmlFor="mobile" className='mr-2 text-black-500 font-medium'>
                         Bangladeshi Mobile Number : 
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        autoComplete="off"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter Mobile Number"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                    </div>
                    <div className="mb-3 px-2">
                        <label htmlFor="password" className='mr-2 text-black-500 font-medium'>
                        Password :
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        type="password"
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />  
                    </div>
                    {error && <p className='text-red-500 font-medium ml-2 mb-3 text-center'>Authentication Failure</p>}
                    <div className="flex flex-col items-center">
                    <button type="submit" className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Please Login</button>
                    <button type="button" onClick={()=>{router.push('/signup')}} className="w-10/12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Please Signup if you do not have account</button>
                    </div>
                    </form>
        </div>
    </div>
  );
};

const DeciderComponent = () => {
    const [token, setToken] = useState('')
    const router = useRouter()
    useEffect(()=>{
      let jwt = localStorage.getItem("jwt_token");
      setToken(jwt);
    },[])

    if(token){
       router.push('/')
       return <HomePage />
    }else{
       return <Login />
    }
}


export default DeciderComponent;