import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star, StarHalf, Star as StarFilled } from "lucide-react";
import Products from "./Products";
import { useCart } from "../context/cartContext";  
import { useNavigate } from "react-router-dom";



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]); // user reviews
  const { addToCart } = useCart();
const navigate = useNavigate();

const handleAddToCart = () => {
  addToCart(product, quantity);
};

const handleBuyNow = () => {
  addToCart(product, quantity); 
  navigate("/payment");
};
  const [newReview, setNewReview] = useState({
    name: "",
    stars: 5,
    text: "",
  });

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <StarFilled key={i} size={16} className="text-yellow-500 fill-yellow-500" />
        );
      } else if (rating > i - 1 && rating < i) {
        stars.push(
          <StarHalf key={i} size={16} className="text-yellow-500 fill-yellow-500" />
        );
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-400" />);
      }
    }
    return stars;
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

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="w-[100%] md:w-[100%] mx-auto py-10 " style={{ margin: "100px 0 50px 0px" }}>
      {/* Product Info */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-24 w-[90%] mx-auto" style={{ margin: "50px auto" }}>
  {/* Image */}
  <div className="flex justify-center items-start">
    <img
      src={product.image}
      alt={product.title}
      className="w-[200px] md:w-[400px] object-contain"
    />
  </div>

  {/* Info */}
  <div className="flex flex-col gap-4 col-span-1">
    <h2 className="text-2xl font-semibold">{product.title}</h2>

    <div className="flex items-center gap-2">
      {renderStars(product.rating.rate)}
      <p className="text-sm text-blue-600 underline cursor-pointer">
        {product.rating.count} ratings
      </p>
    </div>

    <p className="text-gray-800 leading-relaxed">{product.description}</p>

    <div className="text-sm font-light space-y-1 mt-2">
      <p>
        FREE delivery by{" "}
        <span className="font-semibold text-black">Sat, 14 Sep</span>
      </p>
      <p>30 days Returnable • Secure transaction</p>
    </div>
  </div>

 {/* Payment Box */}
<div className="p-6 border-1 h-fit  space-y-4 w-full lg:w-[200px]" style= {{padding: "20px 10px" }}>
  <div className="text-3xl font-bold text-green-700" style={{ margin: "0 0 10px 0" }}>
    ${product.price.toFixed(2)}
  </div>
  <p className="text-xs text-gray-600">(All prices include VAT)</p>

  <p className="text-sm text-green-600 font-medium bg-green-100 w-fit px-2 py-1 rounded" style={{ margin: "10px 0" }}>
    Extra 20% off with meem credit cards
  </p>

  {/* Location */}
  <div className="flex items-center gap-2 text-sm text-gray-700" style={{ margin: "10px 0" }}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0L6.343 16.657M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <span>Deliver to <span className="font-semibold">Egypt</span></span>
  </div>

  {/* Quantity */}
  <div className="flex items-center gap-4 text-sm" style={{ margin: "10px 0" }}>
    <span className="font-bold">Quantity:</span>
    <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1"style={{padding:"0px 10px"}} >
      <button
        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
        className=" text-lg font-bold text-red-500 cursor-pointer"
      >
        -
      </button>
      <span className="text-sm md:text-md">{quantity}</span>
      <button
        onClick={() => setQuantity(prev => prev + 1)}
        className="px-2 text-lg font-bold text-green-500 cursor-pointer"
      >
        +
      </button>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-4">
   <button
  onClick={handleAddToCart}
  className="bg-[#FFCC00] w-full py-2 px-6 h-8 rounded-2xl cursor-pointer font-semibold text-sm md:text-md text-black hover:brightness-95 transition"
>
  Add to Cart
</button>

<button
  onClick={handleBuyNow}
  className="bg-orange-400 py-2 px-6 h-8 rounded-2xl font-semibold cursor-pointer text-sm md:text-md text-black hover:bg-orange-500 transition"
>
  Buy Now
</button>

  </div>
</div>

</section>


      {/* Reviews Section */}
      <section className="mt-12 border-t pt-8 flex justify-around flex-col items-center lg:flex-row lg:items-baseline gap-8">
        <div>

        <h3 className="text-xl font-semibold mb-4" style={{ margin: "20px 0" }}>Customer Reviews</h3>

        {/* Overall Rating */}
        <div className="flex items-center gap-4" style={{ marginBottom: "20px" }}>
          <p className="text-2xl text-yellow-600 font-bold">
            ★ {product.rating.rate.toFixed(1)}
          </p>
          <p className="text-gray-600">out of 5</p>
        </div>

        {/* Breakdown */}
        <div className="flex flex-col gap-8 max-w-[300px] mb-6  ">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <p className="w-8">{star}</p>
              <div className="flex-1 bg-gray-200 h-2 rounded">
                <div
                  className="h-full bg-yellow-500 rounded"
                  style={{
                    width: `${Math.floor(Math.random() * 80) + 5}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        </div>
        
        <div>

        {/* User Submitted Reviews */}
        {reviews.length > 0 && (
          <div className="flex flex-col gap-6 mt-6 w-[90%]">
            {reviews.map((review, i) => (
              <div key={i} className="border-t pt-4">
                <p className="font-medium">{review.name}</p>
                <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
                <div className="flex gap-1 my-1">{renderStars(review.stars)}</div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Static Example Reviews */}
        <div className="flex flex-col gap-6 mt-8" style={{ margin: "20px 0" }}>
          {[
            {
              name: "Brooke",
              date: "6 August 2024",
              stars: 4,
              text: "It turned out to be my favorite dress of this summer. It is extremely versatile and flattering. Love it!",
            },
            {
              name: "Elva S. D.",
              date: "11 August 2023",
              stars: 5,
              text: "Bien hecho, bonita tela y bonita caída, fresco y casual. La marca lo dice!!",
            },
          ].map((review, i) => (
            <div key={i} className="border-b pt-4">
              <p className="font-medium">{review.name}</p>
              <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
              <div className="flex gap-1 my-1">{renderStars(review.stars)}</div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
        {/* Add Review Form */}
        <div className="mt-10  pt-6">
          <h4 className="text-lg font-semibold mb-2">Add Your Review</h4>
          <form
            className="flex flex-col gap-4 max-w-lg"
            onSubmit={handleAddReview}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Your Review"
              className="border p-2 rounded"
              rows={4}
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              required
            ></textarea>
            <div className="flex items-center gap-2">
              <label htmlFor="stars" className="text-sm md:text-lg">
                Rating:
              </label>
              <select
                id="stars"
                className="border p-1 rounded text-sm"
                value={newReview.stars}
                onChange={(e) =>
                  setNewReview({ ...newReview, stars: parseInt(e.target.value) })
                }
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Stars
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white h-[32px] py-2 px-4 rounded-3xl hover:bg-green-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
        </div>

      </section>
    </div>
  );
};

export default ProductDetails;
