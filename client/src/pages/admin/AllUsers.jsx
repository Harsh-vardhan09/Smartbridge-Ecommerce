import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    fetchUsersData();
  }, [])

  const fetchUsersData = async() =>{
    await axios.get('http://localhost:6001/api/users/fetch-users').then(
      (response)=>{
        setUsers(response.data.filter(user=> user.usertype === 'customer'));
      }
    )

    await axios.get('http://localhost:6001/api/orders/fetch-orders').then(
      (response)=>{
        setOrders(response.data);
      }
    )
   
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-primary mb-8">All Users</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {users.map((user)=>{
            return(
              <div key={user._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-1">User ID</h5>
                    <p className="text-xs text-gray-800 break-all font-mono">{user._id}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-1">User Name</h5>
                    <p className="text-base text-primary font-semibold">{user.username}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-1">Email Address</h5>
                    <p className="text-sm text-gray-800 break-all">{user.email}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-600 mb-1">Total Orders</h5>
                    <p className="text-2xl font-bold text-accent">{orders.filter(order=> order.userId === user._id).length}</p>
                  </div>
                </div>
              </div>
            )
          })}
          
        </div>

      </div>
    </div>
  )
}

export default AllUsers