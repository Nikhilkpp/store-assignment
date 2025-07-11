import React from "react";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";

export const useLogin=()=>{
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser, roleUser,setRoleUser}=useAuthContext();

    async function login({email,password}){
        const success = handleInputs({  email, password});
        if(!success) return;


        setLoading(true);
        try{

        const res = await fetch("http://localhost:3000/api/v1/users/login",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password}),
            credentials:"include"
        })
        const data = await res.json();

        if(data.error){
            throw new Error(data.error);
        }
        // console.log(data)
        localStorage.setItem("user",JSON.stringify(data.user));
        setRoleUser(data.user.role);
        setAuthUser(data.user);
       





    }catch(error){
        alert(error.message)
    }finally{
        setLoading(false)
    }



    }
    return ({loading,login})
}
export default useLogin;

const handleInputs=({  email, password})=>{
 
  if( email ==='' || password ==='' )
  {
    alert('All fields are mandatory.')
    return false;
  }
  
  if(password.length <8){
    alert('Password must be at least 8 characters');
    return false;
  }
  return true;
}