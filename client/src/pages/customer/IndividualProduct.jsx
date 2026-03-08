import React, { useContext, useEffect, useState } from 'react'
import {HiOutlineArrowLeft} from 'react-icons/hi'
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const IndividualProduct = () => {

const {id} = useParams();
const navigate = useNavigate()

const userId = localStorage.getItem('userId');

const {fetchCartCount} = useContext(GeneralContext);

const [productName, setProductName] = useState('');
const [productDescription, setProductDescription] = useState('');
const [productMainImg, setProductMainImg] = useState('');
const [productCarouselImg1, setProductCarouselImg1] = useState('');
const [productCarouselImg2, setProductCarouselImg2] = useState('');
const [productCarouselImg3, setProductCarouselImg3] = useState('');
const [productSizes, setProductSizes] = useState([]);
const [productPrice, setProductPrice] = useState(0);
const [productDiscount, setProductDiscount] = useState(0);


useEffect(()=>{
    fetchProduct();
},[])

const fetchProduct = async () =>{
    await axios.get(`http://localhost:6001/api/products/fetch-product-details/${id}`).then(
        (response)=>{
            setProductName(response.data.title);
            setProductDescription(response.data.description);
            setProductMainImg(response.data.mainImg);
            setProductCarouselImg1(response.data.carousel[0]);
            setProductCarouselImg2(response.data.carousel[1]);
            setProductCarouselImg3(response.data.carousel[2]);
            setProductSizes(response.data.sizes);
            setProductPrice(response.data.price);
            setProductDiscount(response.data.discount);
        }
    )
}

const [productQuantity, setProductQuantity] = useState(1);

const [size, setSize] = useState('');
const [name, setName] = useState('');
const [mobile, setMobile] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [pincode, setPincode] = useState('');
const [paymentMethod, setPaymentMethod] = useState('');
const [showBuyNowModal, setShowBuyNowModal] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);




const buyNow = async() =>{
  const token = localStorage.getItem("token"); 
await axios.post(
  'http://localhost:6001/api/orders/buy-product',
  {
    name, email, mobile, address, pincode,
    title: productName, description: productDescription,
    mainImg: productMainImg, size, quantity: productQuantity,
    price: productPrice, discount: productDiscount,
    paymentMethod, orderDate: new Date()
  },
  {
    headers: { Authorization: `Bearer ${token}` } 
  }
)
.then((response)=>{
    setShowBuyNowModal(false);
    alert('Order placed!!');
    navigate('/profile');
})
.catch((err)=>{
    alert("Order failed!!");
});
}


const handleAddToCart = async() =>{
    await axios.post('http://localhost:6001/api/cart/add-to-cart', {userId, title: productName, description: productDescription, mainImg: productMainImg, size, quantity: productQuantity, price: productPrice, discount: productDiscount}).then(
        (response)=>{
            alert("product added to cart!!");
            navigate('/cart');
        }
    ).catch((err)=>{
        alert("Operation failed!!");
    })
}
const carouselImages = [productCarouselImg1, productCarouselImg2, productCarouselImg3];

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={()=> navigate('/')} 
          className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors mb-6"
        >
          <HiOutlineArrowLeft className="text-xl" />
          <span className="font-medium">Back to Shopping</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm aspect-square">
              <img 
                src={carouselImages[currentImageIndex] || productMainImg} 
                alt={productName} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-3">
              {carouselImages.filter(img => img).map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all ${
                    currentImageIndex === index ? 'ring-2 ring-accent' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${productName} ${index + 1}`} 
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-primary mb-4">{productName}</h1>
            <p className="text-gray-600 mb-6">{productDescription}</p>
            
            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                ₹{parseInt(productPrice - (productPrice * productDiscount)/100)}
              </span>
              <span className="text-xl text-gray-400 line-through">₹{productPrice}</span>
              <span className="text-sm font-semibold text-accent bg-red-50 px-3 py-1 rounded">
                {productDiscount}% off
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <span className="font-semibold">Rating:</span>
              <span>⭐ 3.4/5</span>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary mb-3">Choose Size</label>
              <select 
                value={size} 
                onChange={(e)=>setSize(e.target.value)}
                className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer"
              >
                <option value="">Select size</option>
                {productSizes.map((s)=>(
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary mb-3">Quantity</label>
              <select 
                value={productQuantity} 
                onChange={(e)=>setProductQuantity(e.target.value)}
                className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Delivery Info */}
            <p className="text-green-600 font-medium mb-6">✓ Free delivery in 5 days</p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowBuyNowModal(true)}
                className="py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all shadow-md hover:shadow-lg"
              >
                Buy Now
              </button>
              <button 
                onClick={handleAddToCart}
                className="py-3 text-accent border-2 border-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Buy Now Modal */}
        {showBuyNowModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">Checkout</h2>
                <button 
                  onClick={() => setShowBuyNowModal(false)} 
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Delivery Details */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Delivery Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                          value={mobile} 
                          onChange={(e)=>setMobile(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                          value={email} 
                          onChange={(e)=>setEmail(e.target.value)} 
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
                          onChange={(e)=>setAddress(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 bg-secondary border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all" 
                          value={pincode} 
                          onChange={(e)=>setPincode(e.target.value)} 
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
                    onChange={(e)=>setPaymentMethod(e.target.value)}
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
                  onClick={() => setShowBuyNowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors" 
                  onClick={buyNow}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default IndividualProduct