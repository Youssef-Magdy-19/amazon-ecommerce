import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useWindowScrollToTop()
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products", err);
        setLoading(false);
      });
  }, []);
  console.log(products)
  if (loading) return <p className="text-center py-8">Loading..</p>;
  console.log(products)
  return (
    <section className="w-[92%] md:w-[85%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mx-auto">
      {products.map(product => (
        <ProductCard key={product.id} id={product.id} title={product.title} image={product.image} price={product.price} rate={product.rating.rate} count={product.rating.count}  />
      ))}
    </section>
  );
};

export default Products;
