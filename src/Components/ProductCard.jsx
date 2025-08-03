import { Link } from "react-router-dom";
// @ts-ignore
import filledStar from "../assets/filledStar.svg";
// @ts-ignore
import emptyStar from '../assets/emptyStar.svg';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Minus, Plus, Trash, Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { cart, addProductToCart, decreaseProductQuantity, removeProductFromWishlist, addProductToWishlist, isInWishlist } = useContext(GlobalContext);
  const productInCart = cart.find((item) => item.id === product.id);

  const [liked, setLiked] = useState(isInWishlist(product.id));

  useEffect(() => {
    setLiked(isInWishlist(product.id));
  }, [isInWishlist, product.id]);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          src={product.rate >= i ? filledStar : emptyStar}
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
      <Link to={`/products/${product.id}`} className="block my-3">
        <img
          src={product.image}
          loading="lazy"
          className="w-[250px] h-[250px] object-contain mx-auto"
          alt="product product.image"
        />
      </Link>
      <div className="flex flex-col justify-between gap-3 mb-3">
        <h3 className="w-full font-medium text-lg">{product.title.slice(0, 16)} ...</h3>
        <div className="flex flex-col">
          <div className="rating flex gap-2 items-center w-2/3">
            <div className="stars flex items-center justify-between gap-0.5">
              {renderStars()}
            </div>
            <p className="product.count font-normal text-[#1F8394]">{product.count}</p>
          </div>
          <p className="bought font-normal text-[#717171]">
            1k+ bought in past month
          </p>
        </div>
        <div className="flex flex-col">
          <div className="w-2/3">
            <p className="font-normal text-xl">
              ${product.price.toFixed(2)}{" "}
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
          <div className="flex justify-between items-center gap-[2rem]">
            {productInCart ? (
              <div className="flex items-center justify-between rounded-full gap-[1rem] w-[140px] border-2 border-yellow-300" >
                <button
                  onClick={() =>
                    addProductToCart(product)
                  }
                  style={{ padding: '.5px 7px', borderRadius: '10px 0 0 10px' }}
                >
                  <Plus className="w-4 h-4 cursor-pointer" />
                </button>
                <p className="text-lg">{productInCart.quantity}</p>
                <button
                  onClick={() => decreaseProductQuantity(product.id)}
                  style={{ padding: '.5px 7px', borderRadius: '10px 0 0 10px' }}
                >
                  {productInCart.quantity == 1 ?
                    <Trash className="w-4 h-4 cursor-pointer" />
                    :
                    <Minus className="w-4 h-4 cursor-pointer" />
                  }
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  addProductToCart(product)
                }
                className="w-fit py-1 px-4 bg-[#FFCC00] font-light rounded-4xl cursor-pointer"
              >
                Add to cart
              </button>
            )}
            <button>
              <Heart
                size={20}
                color={liked ? 'red' : 'gray'}
                fill={liked ? 'red' : 'none'}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setLiked(!liked)
                  liked ? removeProductFromWishlist(product.id) : addProductToWishlist(product)
                }}
              />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;