import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Register = ({setIsLogin}) => {

  const {setUsername, setEmail, setPassword, setUsertype, register} = useContext(GeneralContext);


  const handleRegister = async (e) =>{
    e.preventDefault();
    await register()
  }
  return (
    <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleRegister}>
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Create Account</h2>
        
        <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
              placeholder="Enter username"
              onChange={(e)=> setUsername(e.target.value)} 
            />
        </div>

        <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
              placeholder="name@example.com"
              onChange={(e)=> setEmail(e.target.value)} 
            />
        </div>

        <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
              placeholder="••••••••"
              onChange={(e)=> setPassword(e.target.value)} 
            /> 
        </div>

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
            <select 
              className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer" 
              onChange={(e)=> setUsertype(e.target.value)}
            >
              <option value="">Select user type</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
        </div>
        
        <button 
          type="submit"
          className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already registered? <span onClick={()=> setIsLogin(true)} className="text-accent font-semibold cursor-pointer hover:underline">Sign in</span>
        </p>
    </form>
  )}
export default Register;