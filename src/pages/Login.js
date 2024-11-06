import React, { useState } from "react";
import {signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth} from './firebaseConfig'; // Import Firebase services
import './Login.css';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-container flex justify-center items-center h-screen">
      <div className="login-box bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Member Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600">LOGIN</button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 hover:underline">Forgot Username / Password?</a>
        </div>
        <div className="text-center mt-6">
          <a href="/register" className="text-gray-700 hover:underline">Create your Account &rarr;</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
