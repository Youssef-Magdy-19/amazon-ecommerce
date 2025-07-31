import { Star, StarHalf, Star as StarFilled } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const ProductInfo = ({ product, quantity, setQuantity, handleAddToCart, handleBuyNow }) => {
  const navigate = useNavigate()
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-24 w-[90%] mx-auto" style={{ margin: "50px auto" }}>
      <div className="flex justify-center items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-[200px] md:w-[400px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-4 col-span-1">
        <h2 className="text-2xl font-semibold">{product.title}</h2>

        <div className="flex items-center gap-2">
          {product.rating && renderStars(product.rating.rate)}
          <p className="text-sm text-blue-600 underline cursor-pointer">
            {product.rating?.count} ratings
          </p>
        </div>

        <p className="text-gray-800 leading-relaxed">{product.description}</p>

        <div className="text-sm font-light space-y-1 mt-2">
          <p>FREE delivery by <span className="font-semibold text-black">Sat, 14 Sep</span></p>
          <p>30 days Returnable • Secure transaction</p>
        </div>
      </div>

      <div className="p-6 border-1 h-fit  space-y-4 w-full lg:w-[200px]" style={{ padding: "20px 10px" }}>
        <div className="text-3xl font-bold text-green-700" style={{ margin: "0 0 10px 0" }}>
          ${product.price.toFixed(2)}
        </div>
        <p className="text-xs text-gray-600">(All prices include VAT)</p>

        <p className="text-sm text-green-600 font-medium bg-green-100 w-fit px-2 py-1 rounded" style={{ margin: "10px 0" }}>
          Extra 20% off with meem credit cards
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-700" style={{ margin: "10px 0" }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0L6.343 16.657M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Deliver to <span className="font-semibold">Egypt</span></span>
        </div>

        <div className="flex items-center gap-4 text-sm" style={{ margin: "10px 0" }}>
          <span className="font-bold">Quantity:</span>
          <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1" style={{ padding: "0px 10px" }}>
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="text-lg font-bold text-red-500 cursor-pointer">-</button>
            <span className="text-sm md:text-md">{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)} className="px-2 text-lg font-bold text-green-500 cursor-pointer">+</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-[#FFCC00] w-full py-2 px-6 h-8 rounded-2xl cursor-pointer font-semibold text-sm md:text-md text-black hover:brightness-95 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleBuyNow()}
            className="bg-orange-400 py-2 px-6 h-8 rounded-2xl font-semibold cursor-pointer text-sm md:text-md text-black hover:bg-orange-500 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
