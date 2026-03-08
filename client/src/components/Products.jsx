import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = (props) => {

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
            if(props.category === 'all'){
                setProducts(response.data);
                setVisibleProducts(response.data);
            }else{
                setProducts(response.data.filter(product=> product.category === props.category));
                setVisibleProducts(response.data.filter(product=> product.category === props.category));
            }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
            <h2 className="text-xl font-bold text-primary mb-6">Filters</h2>
            
            {/* Sort By */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">Sort By</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="sort" 
                    value="popularity" 
                    checked={sortFilter === 'popularity'} 
                    onChange={handleSortFilterChange}
                    className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">Popular</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="sort" 
                    value="low-price" 
                    checked={sortFilter === 'low-price'} 
                    onChange={handleSortFilterChange}
                    className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">Price (Low to High)</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="sort" 
                    value="high-price" 
                    checked={sortFilter === 'high-price'} 
                    onChange={handleSortFilterChange}
                    className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">Price (High to Low)</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="sort" 
                    value="discount" 
                    checked={sortFilter === 'discount'} 
                    onChange={handleSortFilterChange}
                    className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">Discount</span>
                </label>
              </div>
            </div>

            {/* Categories */}
            {props.category === 'all' && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category)=>(
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        value={category} 
                        checked={categoryFilter.includes(category)} 
                        onChange={handleCategoryCheckBox}
                        className="w-4 h-4 text-accent rounded focus:ring-accent focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Gender */}
            <div>
              <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">Gender</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    value="Men" 
                    checked={genderFilter.includes('Men')} 
                    onChange={handleGenderCheckBox}
                    className="w-4 h-4 text-accent rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">Men</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    value="Women" 
                    checked={genderFilter.includes('Women')} 
                    onChange={handleGenderCheckBox}
                    className="w-4 h-4 text-accent rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">Women</span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    value="Unisex" 
                    checked={genderFilter.includes('Unisex')} 
                    onChange={handleGenderCheckBox}
                    className="w-4 h-4 text-accent rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-accent transition-colors">Unisex</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">All Products</h2>
            <p className="text-gray-600 text-sm mt-1">{visibleProducts.length} items found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product)=>(
              <div 
                key={product._id}
                className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group'
                onClick={()=> navigate(`/product/${product._id}`)}
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img 
                    src={product.mainImg} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary mb-1 line-clamp-1 group-hover:text-accent transition-colors">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-bold text-primary">₹{parseInt(product.price - (product.price * product.discount)/100)}</span>
                    <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                    <span className="text-xs font-semibold text-accent bg-red-50 px-2 py-1 rounded">{product.discount}% off</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products