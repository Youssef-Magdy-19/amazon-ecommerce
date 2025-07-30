import { useState, useEffect } from "react"
import axios from "axios"
import ProductCard from "../Components/ProductCard"
import LoadingSpinner from "./Test/LoadingSpinner"
import CategoryFilter from "./Test/CategoryFilter"


const Products = () => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


   useEffect(() => {
      fetchProducts()
      fetchCategories()
    }, [])
  
    useEffect(() => {
      if (selectedCategory === "all") {
        setFilteredProducts(products)
      } else {
        setFilteredProducts(products.filter((product) => product.category === selectedCategory))
      }
    }, [selectedCategory, products])
  
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://fakestoreapi.com/products" , {timeout: 100000})
        setProducts(response.data)
        setFilteredProducts(response.data)
      } catch (err) {
        setError("Failed to fetch products")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories", {timeout: 100000})
        setCategories(response.data)
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }
  
    if (loading) return <LoadingSpinner />
    if (error) return <div className="text-center text-red-500 mt-8">{error}</div>

  return (

    <div className="min-h-screen pt bg-gray-50 flex justify-center">

      <main className="container mx-auto px-4 py-8">

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} id={product.id} title={product.title} image={product.image} price={product.price} rate={product.rating.rate} count={product.rating.count}  />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">No products found in this category.</div>
        )}
      </main>
    </div>
  );
};

export default Products;
