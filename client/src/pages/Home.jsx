import React, { useEffect, useState } from 'react'
import Products from '../components/Products'
import Footer from '../components/Footer'
import FlashSale from '../components/FlashSale'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate();

  const [bannerImg, setBannerImg] = useState();

  useEffect(()=>{
    fetchBanner();
  }, [])

const fetchBanner = async () => {
  try {
    const response = await axios.get("http://localhost:6001/api/banners"); // public route
    setBannerImg(response.data);
  } catch (err) {
    console.error("Failed to fetch banner:", err.response?.data?.message || err.message);
  }
};

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Banner */}
      <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 tracking-tight">
                Shop Smarter,
                <br />
                <span className="text-accent">Live Better</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Discover amazing deals on electronics, fashion, groceries and more. Your one-stop destination for everything you need.
              </p>
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products-body');
                  if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Shop Now
              </button>
            </div>
            {bannerImg && (
              <div className="flex-1 max-w-lg">
                <img 
                  src={bannerImg} 
                  alt="Shop Banner" 
                  className="w-full h-auto rounded-2xl shadow-lg" 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          
          <div 
            className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" 
            onClick={()=>navigate('/category/Fashion')}
          >
            <div className="aspect-square overflow-hidden bg-support-yellow bg-opacity-10">
              <img 
                src="https://tse3.mm.bing.net/th/id/OIP.ORH_mwC_R1rP2xGViNy_lwHaE8?pid=Api&P=0&h=180" 
                alt="Fashion" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center py-4 font-semibold text-primary group-hover:text-accent transition-colors">Fashion</h3>
          </div>

          <div 
            className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" 
            onClick={()=>navigate('/category/Electronics')}
          >
            <div className="aspect-square overflow-hidden bg-blue-50">
              <img 
                src="https://5.imimg.com/data5/ANDROID/Default/2023/1/SE/QC/NG/63182719/product-jpeg-500x500.jpg" 
                alt="Electronics" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center py-4 font-semibold text-primary group-hover:text-accent transition-colors">Electronics</h3>
          </div>

          <div 
            className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" 
            onClick={()=>navigate('/category/mobiles')}
          >
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jUW7v1WFJL9Ylax9a4vazyKXwG-ktSinI4Rd7qi7MkhMr79UlIyyrNkbiK0Cz5u6WYw&usqp=CAU" 
                alt="Mobiles" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center py-4 font-semibold text-primary group-hover:text-accent transition-colors">Mobiles</h3>
          </div>

          <div 
            className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" 
            onClick={()=>navigate('/category/Groceries')}
          >
            <div className="aspect-square overflow-hidden bg-green-50">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbpV_yQ_zCtZt_1kNebjvFqXvdDnLuuJPsQ&usqp=CAU" 
                alt="Groceries" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center py-4 font-semibold text-primary group-hover:text-accent transition-colors">Groceries</h3>
          </div>

          <div 
            className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group" 
            onClick={()=>navigate('/category/Sports-Equipment')}
          >
            <div className="aspect-square overflow-hidden bg-orange-50">
              <img 
                src="https://a.storyblok.com/f/112937/568x464/82f66c3a21/all_the_english-_football_terms_you_need_to_know_blog-hero-low.jpg/m/620x0/filters:quality(70)/" 
                alt="Sports Equipment" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center py-4 font-semibold text-primary group-hover:text-accent transition-colors">Sports Equipments</h3>
          </div>

        </div>
      </div>

      {/* Products Section */}
      <div id='products-body' className="scroll-mt-20"></div>
      <Products category = 'all'  />

      <Footer />
    </div>
  )
}

export default Home