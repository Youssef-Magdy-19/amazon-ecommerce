import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

import ProductInfo from "../Components/ProductInfo";
import Reviews from "../Components/Reviews";
import AddReviewForm from "../Components/AddReviewForm";
import LoadingSpinner from "./Test/LoadingSpinner";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProductToCart } = useContext(GlobalContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    stars: 5,
    text: "",
  });

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addProductToCart(product);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      const reviewToAdd = {
        ...newReview,
        date: new Date().toDateString(),
      };
      setReviews([reviewToAdd, ...reviews]);
      setNewReview({ name: "", stars: 5, text: "" });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="w-full mx-auto py-10" style={{ margin: "50px 0 50px 0px" }}>
      <ProductInfo
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
        handleBuyNow={handleBuyNow}
      />

      <section className="my-4 border-t flex justify-center flex-col items-center lg:flex-row lg:items-baseline gap-4 w-[70%] mx-auto">
        <Reviews product={product} reviews={reviews} />
        <AddReviewForm
          newReview={newReview}
          setNewReview={setNewReview}
          handleAddReview={handleAddReview}
        />
      </section>
    </div>
  );
};

export default ProductDetails;
