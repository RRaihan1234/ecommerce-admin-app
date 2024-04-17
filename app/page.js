"use client"
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'
import HomePage from './home/page'
import Login from './login/page'

export default function Home(){
  const router = useRouter()
  const [token, setToken] = useState('')

  useEffect(()=>{
    let jwt = localStorage.getItem("jwt_token");
    setToken(jwt)
  },[])

  if(!token){
    //router.push('/login')
    return (
      <main>
         <Login /> 
      </main>
    );
  }

  return (
    <main>
       <HomePage />
    </main>
  );
}
