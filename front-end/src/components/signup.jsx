import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useSignup}  from "../hooks/useSignup.js";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [isStore, setIsStore] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passMatchError, setPassMatchError]=useState(false);
  useEffect(()=>{
    if(password === confirmPassword){
        setPassMatchError(false)
    }
    else setPassMatchError(true)

  },[confirmPassword,password])

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Invalid email format");
  };
  const handelAdd=(e)=>{
    const add=e.target.value;
    if(add.length>400){
        alert('address length is too high');
        setAddress('')
        
    }
    else setAddress(add);

  }
  const {loading, signup}= useSignup();
  const handleSignup = async(e) => {
    e.preventDefault();
     await signup({ name, email, password, confirmPassword, address,isStore})

  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className={`w-full px-4 py-2 border rounded-md ${
          emailError ? "border-red-500 mb-1" : "mb-4"
        }`}
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && (
        <p className="text-sm text-red-600 mb-3">{emailError}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {passMatchError ? <p className="text-red-500">Password didn't match.</p>:""}

      <input
        type="text"
        placeholder="Address"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={address}
        onChange={handelAdd}
      />

      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          className="mr-2"
          checked={isStore}
          onChange={(e) => setIsStore(e.target.checked)}
        />
        This account is for a store
      </label>
      <Link className="text-gray-500" to='/'>Already have an account ? Login</Link>

      <button
        className="w-full bg-blue-600 mt-3 text-white py-2 rounded-md hover:bg-blue-700 transition"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}
