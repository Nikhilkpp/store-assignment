import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../context/authContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const {loading,login}=useLogin();
  const {roleUser,authUser}=useAuthContext()

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async () => {
    await login({email,password})
    console.log('login done,' ,roleUser,authUser)
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className={`w-full mb-1 px-4 py-2 border rounded-md focus:outline-none ${
          emailError ? "border-red-500" : "focus:ring-2 focus:ring-blue-400"
        }`}
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && <p className="text-sm text-red-600 mb-3">{emailError}</p>}

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link className="text-gray-500" to='/signup'>Don't have any account. Sign Up</Link>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700 transition"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
