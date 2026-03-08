import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const NewProduct = () => {
 
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productCarouselImg1, setProductCarouselImg1] = useState('');
  const [productCarouselImg2, setProductCarouselImg2] = useState('');
  const [productCarouselImg3, setProductCarouselImg3] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [productGender, setProductGender] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);


  const [AvailableCategories, setAvailableCategories] = useState([]);


  useEffect(()=>{
    fetchCategories();
  },[])
  const fetchCategories = async () =>{
    await axios.get('http://localhost:6001/api/products/fetch-categories').then(
      (response)=>{
        setAvailableCategories(response.data);
      }
    )
  }


  const handleCheckBox = (e) =>{
    const value = e.target.value;
    if(e.target.checked){
        setProductSizes([...productSizes, value]);
    }else{
        setProductSizes(productSizes.filter(size=> size !== value));
    }
  }

  const navigate = useNavigate();


  const handleNewProduct = async() =>{
    await axios.post('http://localhost:6001/api/products/add-new-product', {productName, productDescription, productMainImg, productCarousel: [productCarouselImg1, productCarouselImg2, productCarouselImg3], productSizes, productGender, productCategory, productNewCategory, productPrice, productDiscount}).then(
      (response)=>{
        alert("product added");
        setProductName('');
        setProductDescription('');
        setProductMainImg('');
        setProductCarouselImg1('');
        setProductCarouselImg2('');
        setProductCarouselImg3('');
        setProductSizes([]);
        setProductGender('');
        setProductCategory('');
        setProductNewCategory('');
        setProductPrice(0);
        setProductDiscount(0);

        navigate('/all-products');
      }
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-3xl font-bold text-primary mb-8">New Product</h3>

          <div className="space-y-6">

            {/* Product Name & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productName} 
                  onChange={(e)=>setProductName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productDescription} 
                  onChange={(e)=>setProductDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
            </div>

            {/* Thumbnail Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image URL</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                value={productMainImg} 
                onChange={(e)=>setProductMainImg(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>

            {/* Additional Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add-on Image 1 URL</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productCarouselImg1} 
                  onChange={(e)=>setProductCarouselImg1(e.target.value)}
                  placeholder="Image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add-on Image 2 URL</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productCarouselImg2} 
                  onChange={(e)=>setProductCarouselImg2(e.target.value)}
                  placeholder="Image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add-on Image 3 URL</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productCarouselImg3} 
                  onChange={(e)=>setProductCarouselImg3(e.target.value)}
                  placeholder="Image URL"
                />
              </div>
            </div>

            {/* Available Sizes */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3">Available Sizes</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="S" 
                    checked={productSizes.includes('S')} 
                    onChange={handleCheckBox}
                    className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700 font-medium">S</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="M" 
                    checked={productSizes.includes('M')} 
                    onChange={handleCheckBox}
                    className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700 font-medium">M</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="L" 
                    checked={productSizes.includes('L')} 
                    onChange={handleCheckBox}
                    className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700 font-medium">L</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    value="XL" 
                    checked={productSizes.includes('XL')} 
                    onChange={handleCheckBox}
                    className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700 font-medium">XL</span>
                </label>
              </div>
            </div>

            {/* Gender */}
            <div>
              <h4 className="text-lg font-semibold text-primary mb-3">Gender</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="productGender" 
                    value="Men" 
                    onChange={(e)=> setProductGender(e.target.value)}
                    className="w-5 h-5 text-accent focus:ring-accent border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 font-medium">Men</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="productGender" 
                    value="Women" 
                    onChange={(e)=> setProductGender(e.target.value)}
                    className="w-5 h-5 text-accent focus:ring-accent border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 font-medium">Women</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="productGender" 
                    value="Unisex" 
                    onChange={(e)=> setProductGender(e.target.value)}
                    className="w-5 h-5 text-accent focus:ring-accent border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 font-medium">Unisex</span>
                </label>
              </div>
            </div>

            {/* Category, Price, Discount */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white" 
                  value={productCategory} 
                  onChange={(e)=>setProductCategory(e.target.value)}
                >
                  <option value="">Choose category</option>
                  {AvailableCategories.map((category)=>{
                    return(
                      <option key={category} value={category}>{category}</option>
                    )
                  })}
                  <option value="new category">New category</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productPrice} 
                  onChange={(e)=>setProductPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productDiscount} 
                  onChange={(e)=>setProductDiscount(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {/* New Category Input */}
            {productCategory === 'new category' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Category Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                  value={productNewCategory} 
                  onChange={(e)=>setProductNewCategory(e.target.value)}
                  placeholder="Enter new category"
                />
              </div>
            )}

          </div>

          <button 
            className="w-full mt-8 bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent-hover transition-colors font-semibold text-lg" 
            onClick={handleNewProduct}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewProduct