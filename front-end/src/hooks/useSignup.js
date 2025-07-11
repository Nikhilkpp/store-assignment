import React, {useState} from "react";

import { useAuthContext } from "../context/authContext";

export const useSignup =()=>{
    const [loading,setLoading]=useState(false);

    const {authUser, setAuthUser,setRoleUser}=useAuthContext();

    const signup = async({name,email,password,confirmPassword,address,isStore})=>{

        const success = handleInputs({ name, email, password, confirmPassword, address});

        if(!success) return;
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/v1/users/signup",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name, email, password, confirmPassword, address,role:isStore}),
                credentials:"include"
            });
            const data = await res.json();
            if(data.error){
                alert(data.error)
                throw new Error(data.error);
            }
            localStorage.setItem("user",JSON.stringify(data.message));

            setAuthUser(data.message);
            setRoleUser(authUser?.role || null);
            
        } catch (error) {
            alert(error.message)
            
        }finally{
            setLoading(false)
        }



    }
    return({loading,signup})
}
export default useSignup;


const handleInputs=({ name, email, password, confirmPassword, address})=>{
  
  if(name ==='' || email ==='' || password ==='' || confirmPassword ==='' || address === '')
  {
    alert('All fields are mandatory.')
    return false;
  }
  if (password !== confirmPassword){
    alert("Passwords do not match");
    return false;
  }
  if(password.length <8){
    alert('Password must be at least 8 characters');
    return false;
  }
  return true;
}