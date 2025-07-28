"use client"

import { useState } from "react"

const ProductCard = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + "..."
  }

  return (
    <div className="max-w-sm bg-white border  border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden rounded-t-lg bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}
        {!imageError ? (
          <img
            className={`w-full h-full object-contain p-4 transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
            {product.category}
          </span>
        </div>

        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-2">
          {truncateText(product.title, 50)}
        </h5>

        <p className="mb-3 font-normal text-gray-700 text-sm line-clamp-3">{truncateText(product.description, 100)}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-300 me-1" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className="text-sm text-gray-500">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>

        <button className="w-full mt-4 text-white bg-amber-500 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
