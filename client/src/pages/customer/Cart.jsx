import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';

const Cart = () => {
  const { cartCount, setCartCount } = useContext(GeneralContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.get('http://localhost:6001/api/cart/fetch-cart', config);

      // Ensure cartItems is always an array
      const items = Array.isArray(response.data) ? response.data : [];
      setCartItems(items);

      // Update navbar count using total quantity
      const count = items.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios.delete(`http://localhost:6001/api/cart/remove-item/${itemId}`, config);
      fetchCart(); // refresh cart after deletion
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = cartItems.reduce((sum, item) => sum + ((item.price * item.discount) / 100) * item.quantity, 0);
    setTotalPrice(total);
    setTotalDiscount(Math.floor(discount));
    setDeliveryCharges(total > 1000 || cartItems.length === 0 ? 0 : 50);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  // Checkout form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const userId = localStorage.getItem('userId');

  const placeOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      await axios.post('http://localhost:6001/api/orders/place-cart-order', {
        userId,
        name,
        mobile,
        email,
        address,
        pincode,
        paymentMethod,
        orderDate: new Date(),
      });
      alert('Order placed!');
      setName('');
      setMobile('');
      setEmail('');
      setAddress('');
      setPincode('');
      setShowCheckoutModal(false);
      navigate('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (loading) return <div className="min-h-screen bg-secondary flex items-center justify-center"><p className="text-gray-600 text-lg">Loading cart...</p></div>;

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <button 
              onClick={() => navigate('/')} 
              className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      <img 
                        src={item.mainImg} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="flex gap-4 mb-3">
                        <span className="text-sm text-gray-700">
                          <b>Size:</b> {item.size}
                        </span>
                        <span className="text-sm text-gray-700">
                          <b>Qty:</b> {item.quantity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          ₹{parseInt(item.price - (item.price * item.discount) / 100) * item.quantity}
                        </span>
                        <button 
                          className="px-4 py-2 text-accent border border-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-colors" 
                          onClick={() => removeItem(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
                <h2 className="text-xl font-bold text-primary mb-6">Price Details</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Total MRP:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount on MRP:</span>
                    <span>- ₹{totalDiscount}</span>
                  </div>
                  <div className="flex justify-between text-accent">
                    <span>Delivery Charges:</span>
                    <span>{deliveryCharges === 0 ? 'FREE' : `+ ₹${deliveryCharges}`}</span>
                  </div>
                </div>
                <hr className="border-gray-200 my-4" />
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-primary">Final Price:</span>
                  <span className="text-2xl font-bold text-primary">₹{totalPrice - totalDiscount + deliveryCharges}</span>
                </div>
                <button 
                  className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">Checkout</h2>
                <button 
                  onClick={() => setShowCheckoutModal(false)} 
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Checkout Details */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Delivery Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                          value={mobile} 
                          onChange={(e) => setMobile(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                          value={address} 
                          onChange={(e) => setAddress(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                          value={pincode} 
                          onChange={(e) => setPincode(e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Payment Method</h3>
                  <select 
                    className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer" 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Choose payment method</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="card">Card Payment</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
                <button 
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors" 
                  onClick={() => setShowCheckoutModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors" 
                  onClick={placeOrder}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
