import React from 'react'
import Footer from '../../components/Footer'
import Products from '../../components/Products'
import { useParams } from 'react-router-dom'

const CategoryProducts = () => {

  const {category} = useParams();

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8 capitalize">{category}</h1>
      </div>

      <Products category={category} />

      <Footer />
    </div>
  )
}

export default CategoryProducts