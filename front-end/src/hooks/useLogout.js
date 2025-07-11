import React from "react";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";


export const useLogout=()=>{
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser, setRoleUser}=useAuthContext();
    async function  logout(){
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/v1/users/logout",{
                method:"POST",
                credentials:"include"
            })
            const data = await res.json();
            if(data.error) return;

            localStorage.removeItem('user');
            setAuthUser(null);
            setRoleUser(null);

            
        } catch (error) {
            alert('An error occured', error)
            
        }finally{
            setLoading(false);
        }
    }
    return({loading,logout})


}
export default useLogout;