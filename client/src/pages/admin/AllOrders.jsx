import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllOrders = () => {


  const [orders, setOrders] = useState([]);

  const [updateStatus, setUpdateStatus] = useState('');


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
  try {
    const { data } = await axios.put('http://localhost:6001/api/orders/cancel-order', { orderId });
    alert(data.message || "Order cancelled!!");
    fetchOrders();
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Order cancellation failed!!");
  }
};


  const updateOrderStatus = async(id) =>{
    await axios.put('http://localhost:6001/api/orders/update-order-status', {id, updateStatus}).then(
      (response)=>{
        alert("Order status updated!!");
        setUpdateStatus('');
        fetchOrders();
      }
    ).catch((err)=>{
      alert("Order update failed!!");
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-primary mb-8">All Orders</h3>

        <div className="space-y-6">

          {orders.map((order)=>{
            return(
              <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  
                  <div className="md:w-48 md:h-48 flex-shrink-0">
                    <img 
                      src={order.mainImg} 
                      alt={order.title} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-1">{order.title}</h4>
                      <p className="text-gray-600 text-sm">{order.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Size:</span>
                        <span className="ml-2 text-gray-600">{order.size}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Quantity:</span>
                        <span className="ml-2 text-gray-600">{order.quantity}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Price:</span>
                        <span className="ml-2 text-accent font-bold">₹{parseInt(order.price - (order.price * order.discount)/100) * order.quantity}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Payment:</span>
                        <span className="ml-2 text-gray-600">{order.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700">User ID:</p>
                        <p className="text-xs text-gray-600 break-all font-mono">{order.userId}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Name:</p>
                        <p className="text-gray-600">{order.name}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Email:</p>
                        <p className="text-gray-600 break-all text-xs">{order.email}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Mobile:</p>
                        <p className="text-gray-600">{order.mobile}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700">Ordered on:</p>
                        <p className="text-gray-600">{order.orderDate.slice(0,10)}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Address:</p>
                        <p className="text-gray-600">{order.address}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Pincode:</p>
                        <p className="text-gray-600">{order.pincode}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <span className="font-semibold text-gray-700">Status: </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      
                      {order.orderStatus === 'delivered' || order.orderStatus === 'cancelled' ? null : (
                        <div className="flex flex-wrap items-center gap-2">
                          <select 
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                            defaultValue="" 
                            onChange={(e)=> setUpdateStatus(e.target.value)}
                          >
                            <option value="" disabled>Update status</option>
                            <option value="Order placed">Order Placed</option>
                            <option value="In-transit">In-transit</option>
                            <option value="delivered">Delivered</option>
                          </select>
                          <button 
                            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors font-medium text-sm" 
                            onClick={()=> updateOrderStatus(order._id)}
                          >
                            Update
                          </button>
                        </div>
                      )}

                      {order.orderStatus === 'order placed' || order.orderStatus === 'In-transit' ? (
                        <button 
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm" 
                          onClick={()=> cancelOrder(order._id)}
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>

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

export default AllOrders