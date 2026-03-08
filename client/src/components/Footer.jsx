import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">ShopEZ</h2>
          <p className="text-gray-600 text-sm">One Destination for all your needs</p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Home</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Categories</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">All products</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">Account</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Cart</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Profile</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Orders</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">Tech</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Electronics</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Mobiles</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Laptops</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">More</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Fashion</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Grocery</li>
              <li className="text-gray-600 text-sm hover:text-accent cursor-pointer transition-colors">Sports</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-500 text-sm">© 2024 ShopEZ.com - All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer