import React, { useContext, useEffect, useState } from 'react'
import {BsCart3, BsPersonCircle} from 'react-icons/bs'
import {FiSearch} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext'
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios'

const Navbar = () => {


  const navigate = useNavigate();

  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username');

  const {cartCount, logout} = useContext(GeneralContext);

  const [productSearch, setProductSearch] = useState('');

  const [noResult, setNoResult] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = async() =>{

    await axios.get('http://localhost:6001/api/products/fetch-categories').then(
      (response)=>{
        setCategories(response.data);
      }
    )
  }

  const handleSearch = () =>{
    if (categories.includes(productSearch)){
      navigate(`/category/${productSearch}`);
    }else{
      setNoResult(true);
    }
  }

  return (

    <>
      {/* user navbar */}

      {!usertype ?

          <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <h1 
                  onClick={()=> navigate('')} 
                  className="text-2xl font-bold text-primary cursor-pointer tracking-tight hover:text-primary-light transition-colors"
                >
                  ShopEZ
                </h1>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl mx-8 relative">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="nav-search" 
                      id="nav-search" 
                      placeholder='Search Electronics, Fashion, mobiles...' 
                      onChange={(e)=>setProductSearch(e.target.value)}
                      className="w-full px-4 py-2 pl-4 pr-10 bg-secondary text-primary text-sm rounded-lg border border-transparent focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                    />
                    <FiSearch 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer hover:text-accent transition-colors" 
                      onClick={handleSearch} 
                    />
                  </div>
                  {noResult === true && (
                    <div className='absolute top-full mt-2 left-0 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 flex items-start justify-between z-10'>
                      <span>No items found. Try searching for Electronics, mobiles, Groceries, etc.</span>
                      <AiOutlineClose 
                        className='text-gray-400 hover:text-gray-600 cursor-pointer ml-2 flex-shrink-0 mt-0.5' 
                        onClick={()=> setNoResult(false)} 
                      />
                    </div>
                  )}
                </div>

                {/* Login/Register Buttons */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={()=> navigate('/authentication')}
                    className="px-5 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </nav>

        : usertype === 'customer' ?

          <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      {/* Logo */}
                      <h1 
                        onClick={()=> navigate('')} 
                        className="text-2xl font-bold text-primary cursor-pointer tracking-tight hover:text-primary-light transition-colors"
                      >
                        ShopEZ
                      </h1>

                      {/* Search Bar */}
                      <div className="flex-1 max-w-2xl mx-8 relative">
                        <div className="relative">
                          <input 
                            type="text" 
                            name="nav-search" 
                            id="nav-search" 
                            placeholder='Search Electronics, Fashion, mobiles...' 
                            onChange={(e)=>setProductSearch(e.target.value)}
                            className="w-full px-4 py-2 pl-4 pr-10 bg-secondary text-primary text-sm rounded-lg border border-transparent focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                          />
                          <FiSearch 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer hover:text-accent transition-colors" 
                            onClick={handleSearch} 
                          />
                        </div>
                        {noResult === true && (
                          <div className='absolute top-full mt-2 left-0 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 flex items-start justify-between z-10'>
                            <span>No items found. Try searching for Electronics, mobiles, Groceries, etc.</span>
                            <AiOutlineClose 
                              className='text-gray-400 hover:text-gray-600 cursor-pointer ml-2 flex-shrink-0 mt-0.5' 
                              onClick={()=> setNoResult(false)} 
                            />
                          </div>
                        )}
                      </div>

                      {/* User Icons */}
                      <div className='flex items-center gap-6'>
                        <div 
                          className="flex items-center gap-2 cursor-pointer group" 
                          onClick={()=> navigate('/profile')}
                        >
                          <BsPersonCircle className='text-2xl text-gray-600 group-hover:text-accent transition-colors' />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-accent transition-colors">{username}</span>
                        </div>
                        <div 
                          className="relative cursor-pointer group" 
                          onClick={()=> navigate('/cart')}
                        >
                          <BsCart3 className='text-2xl text-gray-600 group-hover:text-accent transition-colors' />
                          {cartCount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {cartCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>

        :

          <nav className="sticky top-0 z-50 bg-primary shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    {/* Admin Logo */}
                    <h1 
                      onClick={()=> navigate('/admin')} 
                      className="text-2xl font-bold text-white cursor-pointer tracking-tight hover:text-gray-200 transition-colors"
                    >
                      ShopEZ <span className="text-sm font-normal text-gray-400">(admin)</span>
                    </h1>
                    
                    {/* Admin Navigation */}
                    <ul className="flex items-center gap-8">
                      <li 
                        onClick={()=> navigate('/admin')} 
                        className="text-white font-medium cursor-pointer hover:text-accent transition-colors"
                      >
                        Home
                      </li>
                      <li 
                        onClick={()=> navigate('/all-users')} 
                        className="text-white font-medium cursor-pointer hover:text-accent transition-colors"
                      >
                        Users
                      </li>
                      <li 
                        onClick={()=> navigate('/all-orders')} 
                        className="text-white font-medium cursor-pointer hover:text-accent transition-colors"
                      >
                        Orders
                      </li>
                      <li 
                        onClick={()=> navigate('/all-products')} 
                        className="text-white font-medium cursor-pointer hover:text-accent transition-colors"
                      >
                        Products
                      </li>
                      <li 
                        onClick={()=> navigate('/new-product')} 
                        className="text-white font-medium cursor-pointer hover:text-accent transition-colors"
                      >
                        New Product
                      </li>
                      <li 
                        onClick={logout} 
                        className="text-white font-medium cursor-pointer hover:text-accent transition-colors px-4 py-2 bg-accent rounded-lg hover:bg-accent-hover"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

            }
        
    </>
  )
}

export default Navbar