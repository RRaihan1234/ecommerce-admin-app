"use client"
import {useEffect, useState} from 'react';
import HomePage from './home/page'
import Login from './login/page'

export default function Home(){
  const [token, setToken] = useState('')

  useEffect(()=>{
    let jwt = localStorage.getItem("jwt_token");
    setToken(jwt)
  },[])

  if(!token){
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
