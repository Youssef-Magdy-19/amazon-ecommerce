import { Link } from "react-router-dom";
// @ts-ignore
import filledStar from "../assets/filledStar.svg";
// @ts-ignore
import emptyStar from "../assets/emptyStar.svg";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Minus, Plus } from "lucide-react";

const ProductCard = ({ id, title, image, price, rate, count }) => {
  const { cart, addProductToCart, decreaseProductQuantity } = useContext(GlobalContext);
  const productInCart = cart.find((item) => item.id === id);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          src={rate >= i ? filledStar : emptyStar}
          key={i}
          loading="lazy"
          alt="star icon"
        />
      );
    }
    return stars;
  };

  return (
    <div className="p-3 border-2 border-[#D9D9D9]">
      <Link to={`/productDetails/${id}`} className="block my-3">
        <img
          src={image}
          loading="lazy"
          className="w-[250px] h-[250px] object-contain mx-auto"
          alt="product image"
        />
      </Link>
      <div className="flex flex-col justify-between gap-3 mb-3">
        <h3 className="w-full font-medium text-lg">{title}</h3>
        <div className="flex flex-col">
          <div className="rating flex gap-2 items-center w-2/3">
            <div className="stars flex items-center justify-between gap-0.5">
              {renderStars()}
            </div>
            <p className="count font-normal text-[#1F8394]">{count}</p>
          </div>
          <p className="bought font-normal text-[#717171]">
            1k+ bought in past month
          </p>
        </div>
        <div className="flex flex-col">
          <div className="w-2/3">
            <p className="font-normal text-xl">
              ${price.toFixed(2)}{" "}
              <span className="font-normal text-xs text-[#7F7F7F]">
                (21% off)
              </span>
            </p>
          </div>
          <p className="bought font-normal text-[#7F7F7F]">
            Save extra with No Cost EMI
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <p className="font-light">
              FREE delivery by{" "}
              <span className="font-semibold">
                Sat, 14 Sep, 7:00 am - 9:00 pm
              </span>
            </p>
          </div>
          {productInCart ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseProductQuantity(id)}
                className="w-9 h-9 flex justify-center items-center border-2 border-[#D9D9D9] cursor-pointer rounded-full"
              >
                <Minus />
              </button>
              <span className="text-lg">{productInCart.quantity}</span>
              <button
                onClick={() =>
                  addProductToCart({ id, title, image, price, rate, count })
                }
                className="w-9 h-9 flex justify-center items-center border-2 border-[#D9D9D9] cursor-pointer rounded-full"
              >
                <Plus />
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                addProductToCart({ id, title, image, price, rate, count })
              }
              className="w-fit py-1 px-4 bg-[#FFCC00] font-light rounded-4xl cursor-pointer"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;