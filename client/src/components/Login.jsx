import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    await login();
  }

  return (
    <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleLogin}>
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Welcome Back</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button 
        type="submit" 
        className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Sign In
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Not registered? <span onClick={() => setIsLogin(false)} className="text-accent font-semibold cursor-pointer hover:underline">Create an account</span>
      </p>
    </form>
  );
}

export default Login;
