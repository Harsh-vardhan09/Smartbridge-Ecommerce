import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../../context/GeneralContext'
import axios from 'axios';
 
const Profile = () => {

  const {logout} = useContext(GeneralContext);

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const [orders, setOrders] = useState([]);


  useEffect(()=>{
    fetchOrders();
  },[])

  const fetchOrders = async () =>{
    await axios.get(`http://localhost:6001/api/orders/fetch-orders`).then(
      (response)=>{
        setOrders(response.data.reverse());
      }
    )
  }


const cancelOrder = async (orderId) => {
  if (!orderId) {
    alert("Order ID is required");
    return;
  }

  try {
    const { data } = await axios.put(
      "http://localhost:6001/api/orders/cancel-order",
      { orderId } // sending orderId in request body
    );

    console.log("Order cancelled:", data);
    alert("Order cancelled successfully!");

    // Update local state to remove cancelled order
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
      )
    );

  } catch (error) {
    console.error("Cancel order frontend error:", error);
    alert(error.response?.data?.message || "Error cancelling order");
  }
};
  return ( 
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Username</p>
              <p className="text-lg font-semibold text-primary">{username}</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-lg font-semibold text-primary">{email}</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Orders</p>
              <p className="text-lg font-semibold text-primary">{orders.length}</p>
            </div>
          </div>
          <button 
            className='px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors' 
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Your Orders</h2>
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order)=>(
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow" key={order._id}>
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      <img 
                        src={order.mainImg} 
                        alt={order.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">{order.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{order.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div>
                          <span className="text-xs text-gray-500">Size</span>
                          <p className="text-sm font-medium text-gray-700">{order.size}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Quantity</span>
                          <p className="text-sm font-medium text-gray-700">{order.quantity}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Price</span>
                          <p className="text-sm font-medium text-gray-700">₹{parseInt(order.price - (order.price * order.discount)/100) * order.quantity}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Payment</span>
                          <p className="text-sm font-medium text-gray-700 capitalize">{order.paymentMethod}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        <div>
                          <span className="text-xs text-gray-500">Address</span>
                          <p className="text-sm font-medium text-gray-700">{order.address}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Pincode</span>
                          <p className="text-sm font-medium text-gray-700">{order.pincode}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Ordered on</span>
                          <p className="text-sm font-medium text-gray-700">{order.orderDate.slice(0,10)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-500">Status</span>
                          <p className="text-sm font-semibold text-accent capitalize">{order.orderStatus}</p>
                        </div>
                        {(order.orderStatus === 'order placed' || order.orderStatus === 'In-transit') && (
                          <button 
                            className='px-4 py-2 text-accent border border-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-colors' 
                            onClick={()=> cancelOrder(order._id)}
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile