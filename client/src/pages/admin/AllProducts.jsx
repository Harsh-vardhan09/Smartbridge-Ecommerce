import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);

    useEffect(()=>{
        fetchData();
      }, [])
    
      const fetchData = async() =>{

        await axios.get('http://localhost:6001/api/products/fetch-products').then(
          (response)=>{
            setProducts(response.data);
            setVisibleProducts(response.data);
          }
        )
        await axios.get('http://localhost:6001/api/products/fetch-categories').then(
          (response)=>{
            setCategories(response.data);
          }
        )
      }

      const [sortFilter, setSortFilter] = useState('popularity');
      const [categoryFilter, setCategoryFilter] = useState([]);
      const [genderFilter, setGenderFilter] = useState([]);


      const handleCategoryCheckBox = (e) =>{
        const value = e.target.value;
        if(e.target.checked){
            setCategoryFilter([...categoryFilter, value]);
        }else{
            setCategoryFilter(categoryFilter.filter(size=> size !== value));
        }
      }

      const handleGenderCheckBox = (e) =>{
        const value = e.target.value;
        if(e.target.checked){
            setGenderFilter([...genderFilter, value]);
        }else{
            setGenderFilter(genderFilter.filter(size=> size !== value));
        }
      }

      const handleSortFilterChange = (e) =>{
        const value = e.target.value;
        setSortFilter(value);
        if(value === 'low-price'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  a.price - b.price))
        } else if (value === 'high-price'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  b.price - a.price))
        }else if (value === 'discount'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  b.discount - a.discount))
        }
      }
    
      useEffect(()=>{
        if (categoryFilter.length > 0 && genderFilter.length > 0){
            setVisibleProducts(products.filter(product=> categoryFilter.includes(product.category) && genderFilter.includes(product.gender) ));
        }else if(categoryFilter.length === 0 && genderFilter.length > 0){
            setVisibleProducts(products.filter(product=> genderFilter.includes(product.gender) ));
        } else if(categoryFilter.length > 0 && genderFilter.length === 0){
            setVisibleProducts(products.filter(product=> categoryFilter.includes(product.category)));
        }else{
            setVisibleProducts(products);
        }
      }, [categoryFilter, genderFilter])


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <h3 className="text-3xl font-bold text-primary mb-8">All Products</h3>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h4 className="text-xl font-bold text-primary mb-6">Filters</h4>

              <div className="space-y-6">
                
                {/* Sort By */}
                <div>
                  <h6 className="text-sm font-semibold text-gray-700 mb-3">Sort By</h6>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="sortFilter" 
                        value="popularity" 
                        checked={sortFilter === 'popularity'} 
                        onChange={handleSortFilterChange}
                        className="w-4 h-4 text-accent focus:ring-accent border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Popularity</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="sortFilter" 
                        value="low-price" 
                        checked={sortFilter === 'low-price'} 
                        onChange={handleSortFilterChange}
                        className="w-4 h-4 text-accent focus:ring-accent border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Price (low to high)</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="sortFilter" 
                        value="high-price" 
                        checked={sortFilter === 'high-price'} 
                        onChange={handleSortFilterChange}
                        className="w-4 h-4 text-accent focus:ring-accent border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Price (high to low)</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="sortFilter" 
                        value="discount" 
                        checked={sortFilter === 'discount'} 
                        onChange={handleSortFilterChange}
                        className="w-4 h-4 text-accent focus:ring-accent border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Discount</span>
                    </label>
                  </div>
                </div>

                {/* Categories */}
                <div className="pt-6 border-t border-gray-200">
                  <h6 className="text-sm font-semibold text-gray-700 mb-3">Categories</h6>
                  <div className="space-y-2">
                    {categories.map((category)=>{
                      return(
                        <label key={category} className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            value={category} 
                            checked={categoryFilter.includes(category)} 
                            onChange={handleCategoryCheckBox}
                            className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Gender */}
                <div className="pt-6 border-t border-gray-200">
                  <h6 className="text-sm font-semibold text-gray-700 mb-3">Gender</h6>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        value="Men" 
                        checked={genderFilter.includes('Men')} 
                        onChange={handleGenderCheckBox}
                        className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Men</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        value="Women" 
                        checked={genderFilter.includes('Women')} 
                        onChange={handleGenderCheckBox}
                        className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Women</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        value="Unisex" 
                        checked={genderFilter.includes('Unisex')} 
                        onChange={handleGenderCheckBox}
                        className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Unisex</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((product)=>{
                return(
                  <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.mainImg} 
                        alt={product.title} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h6 className="font-semibold text-primary mb-1 line-clamp-1">{product.title}</h6>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-1">{product.description.slice(0,30) + '....'}</p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <h5 className="text-lg font-bold text-accent">₹{parseInt(product.price - (product.price * product.discount)/100)}</h5>
                        <s className="text-sm text-gray-500">₹{product.price}</s>
                        <p className="text-xs text-green-600 font-medium">({product.discount}% off)</p>
                      </div>
                      <button 
                        onClick={()=> navigate(`/update-product/${product._id}`)}
                        className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors font-medium"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AllProducts