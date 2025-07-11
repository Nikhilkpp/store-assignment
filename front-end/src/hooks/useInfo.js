import React, { use } from "react";
import { useAuthContext } from "../context/authContext";


export const useInfo =()=>{
    const{setSampleStores}=useAuthContext();
    const getStores=async()=>{
        try {

            const res = await fetch("http://localhost:3000/api/v1/get/stores",{
                method:"GET",
                credentials:"include"
            });
            const data= await res.json();

            // return data.data;
            setSampleStores(data.data)

            
        } catch (error) {
            alert('an error occured', error)
            
        }
    }
    const getUsers=async()=>{
        try {

            const res = await fetch("http://localhost:3000/api/v1/get/users",{
                method:"GET",
                credentials:"include"
            });
            const data= await res.json();
            return data;
            
            
        } catch (error) {
            alert('an error occured', error)
            
        }
    }
    const submitRating=async(id,rating)=>{
        try {
            const res= await fetch(`http://localhost:3000/api/v1/submitrating/ ${id}`,{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ rating}),
                credentials:"include"
            })
            const data= await res.json();
            if (data.error) return;
            alert('Rating submitted sucessfully.')
            
        } catch (error) {
            
        }


    }
    return({getStores,getUsers,submitRating});

}


export default useInfo;