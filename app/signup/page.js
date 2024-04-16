"use client"
import {useState, useEffect} from 'react';
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUpSchema } from "../schemas/index";

import HomePage from "../../app/home/page";

const initialValues = {
    mobile: "",
    password: "",
    confirm_password: "",
  };

function Signup() {
    const router = useRouter()
    const [userExistsErr, setUserExistsErr] = useState(false);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        let res = await axios.post("/api/signup", {
            mobile : values.mobile,
            password : values.password
        })
        if(res.data.success){
            action.resetForm();
            setUserExistsErr(false);
            router.push('/login')
        }else{
            setUserExistsErr(true);
        }
      },
    });

  return (
    <>
    <div className='flex flex-col items-center mt-28'>
        <h1 className="font-bold text-xl mb-5 text-blue-500">E-Commerce Admin App </h1>
        <div className='flex flex-col items-center p-5 bg-blue-300 border-4 border-blue-500 rounded-3xl'>
        <h1 className="font-bold text-xl mb-3">Signup Form</h1>
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
                        {errors.mobile && touched.mobile ? (
                        <p className='text-red-500 font-medium text-center'>{errors.mobile}</p>
                        ) : null}
                    </div>
                    <div className="mb-2 px-2">
                        <label htmlFor="password" className='mr-2 font-medium'>
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
                        {errors.password && touched.password ? (
                        <p className="text-red-500 font-medium text-center">{errors.password}</p>
                        ) : null}
                    </div>
                    <div className="mb-3 px-2">
                        <label htmlFor="confirm_password" className='mr-2 font-medium'>
                        Confirm Password :
                        </label>
                        <input
                        className="outline-4 outline-green-500 rounded p-1"
                        type="password"
                        autoComplete="off"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Enter Password Again"
                        value={values.confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                        <p className="text-red-500 font-medium text-center">{errors.confirm_password}</p>
                        ) : null}
                    </div>
                    {userExistsErr && <p className="text-red-500 font-medium text-center mb-2">User Already Exists</p>}
                    <div className="flex flex-col items-center">
                    <button type="submit" className="w-10/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Please Signup</button>
                    <button type="button" onClick={()=>{router.push('/login')}} className="w-10/12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Please Login if you have account</button>
                    </div>
                    </form>
        </div>
    </div>
  </>
  );
};

const DeciderComponent = () => {
    const router = useRouter()
    let token = localStorage.getItem("jwt_token");

    if(token){
       router.push('/')
       return <HomePage />
    }else{
       return <Signup />
    }
}


export default DeciderComponent;