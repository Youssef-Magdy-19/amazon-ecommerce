
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import LoadingSpinner from "./Test/LoadingSpinner";
import CategoryFilter from "./Test/CategoryFilter";
import { GlobalContext } from "../context/GlobalContext";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Products = () => {
  const { searchResults, setSearchResults } = useContext(GlobalContext)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useWindowScrollToTop()

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };


  useEffect(() => {
    let base = products;

    // لو فيه بحث اعرض البحث
    if (searchResults !== null) {
      base = searchResults;
    }

    // لو متعلم كاتيجوري غير All فلتر عليه
    if (selectedCategory !== "all") {
      setFilteredProducts(base.filter((p) => p.category === selectedCategory));
    } else {
      setFilteredProducts(base);
    }
  }, [products, searchResults, selectedCategory]);


  // لما تدوس All category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchResults(null);
    }
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="min-h-screen pt bg-gray-50 flex justify-center">
      <main className="container mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No products found in this category.
          </div>
        )}
      </main>
    </div>
  );
};

export default Products
