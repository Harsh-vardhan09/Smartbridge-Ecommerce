import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(()=>{
    if(localStorage.getItem('userType') === 'admin'){
      navigate('/admin')
    }
  }, [localStorage])


  useEffect(()=>{
    fetchCountData();
  }, [])

  const fetchCountData = async() =>{
    await axios.get('http://localhost:6001/api/users/fetch-users').then(
      (response)=>{
        setUserCount(response.data.length - 1);
      }
    )
    await axios.get('http://localhost:6001/api/products/fetch-products').then(
      (response)=>{
        setProductCount(response.data.length);
      }
    )
    await axios.get('http://localhost:6001/api/orders/fetch-orders').then(
      (response)=>{
        setOrdersCount(response.data.length);
      }
    )

  }



 

  const [banner, setBanner] = useState('');
  const updateBanner = async() =>{
    await axios.post('http://localhost:6001/update-banner', {banner}).then(
      (response)=>{
        alert("Banner updated");
        setBanner('');
      }
    )
  }




  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h5 className="text-gray-600 text-sm font-medium mb-2">Total Users</h5>
            <p className="text-4xl font-bold text-primary mb-4">{userCount}</p>
            <button 
              onClick={()=> navigate('/all-users')}
              className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors font-medium"
            >
              View all
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h5 className="text-gray-600 text-sm font-medium mb-2">All Products</h5>
            <p className="text-4xl font-bold text-primary mb-4">{productCount}</p>
            <button 
              onClick={()=> navigate('/all-products')}
              className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors font-medium"
            >
              View all
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h5 className="text-gray-600 text-sm font-medium mb-2">All Orders</h5>
            <p className="text-4xl font-bold text-primary mb-4">{ordersCount}</p>
            <button 
              onClick={()=> navigate('/all-orders')}
              className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors font-medium"
            >
              View all
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h5 className="text-gray-600 text-sm font-medium mb-2">Add Product</h5>
            <p className="text-4xl font-bold text-accent mb-4">(new)</p>
            <button 
              onClick={()=> navigate('/new-product')}
              className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors font-medium"
            >
              Add now
            </button>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
          <h5 className="text-xl font-bold text-primary mb-4">Update Banner</h5>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
              placeholder="Banner URL"
              value={banner} 
              onChange={(e)=>setBanner(e.target.value)} 
            />
            <button 
              onClick={updateBanner}
              className="bg-accent text-white py-2 px-6 rounded-lg hover:bg-accent-hover transition-colors font-medium"
            >
              Update
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Admin