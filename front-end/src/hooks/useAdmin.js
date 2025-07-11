import React from "react";
export const useAdmin=()=>{

    const addUser=async({name,email,password,address,role})=>{
        try {
            const success = handleInputs({name,password, email,role,address});

            if(!success) return;
            const res = await fetch("http://localhost:3000/api/v1/admin/addUser",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({name,password, email,role,address}),
                credentials:'include'
            })
            const data = await res.json();

            if(data.error){
                alert(data.error);
                return;
            } 
            alert('User added successfully');
            
        } catch (error) {
            alert('An error at occured at backend', error)
            
        }

    }
    return({addUser})
}
export default useAdmin;


const handleInputs=({ name, email, password, address})=>{
  // if(
  //   [fullName,username,password,confirmPassword,gender].some((field)=> (field?.trim === ""))
  // )
  if(name ==='' || email ==='' || password ===''  || address === '')
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