import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react"
// @ts-ignore
import filledStar from '../assets/filledStar.svg';
// @ts-ignore
import emptyStar from '../assets/emptyStar.svg';
import { Ellipsis, Plus, Share, UserRound } from "lucide-react";

const WishList =()=>{
  
	const { wishlist, addProductToCart, removeProductFromWishlist} = useContext(GlobalContext);
	const navigate = useNavigate();

	const renderStars = (rate) => {
			const stars = [];
			for (let i = 1; i <= 5; i++) {
				if (rate >= i) {
					stars.push(<img src={filledStar} key={i} loading="lazy" alt="star icon" />);
				} else {
					stars.push(<img src={emptyStar} key={i} loading="lazy" alt="star icon" />);
				}
			}
			return stars;
		};
	
	return (
    <section className="relative top-[124px] md:top-[60px] py-20 w-[90%] md:w-[85%]">
      <h2 className="text-2xl font-semibold text-[#2162a1] mb-3">
        Your Wishlist
      </h2>
      <div className="border-2 border-[#D9D9D9] rounded-ee-lg rounded-es-lg p-4">
        {wishlist.length === 0 ? (
          <div className="text-center flex flex-col">
            <p className="text-lg md:text-xl text-gray-800 mb-5">
              Your Wishlist is empty. Start adding some products!
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-fit py-1 px-4 bg-[#FFCC00] font-light rounded-4xl cursor-pointer mx-auto"
            >
              Go shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 mx-auto">
            <div className="py-4 flex flex-col sm:flex-row justify-between gap-10 border-b-2 border-b-[#D9D9D9]">
              <div className="flex flex-col gap-3">
                <p className="text-lg font-medium">
                  My List
                  <span className="text-sm font-normal ms-2">Private</span>
                </p>
                <div className="flex gap-3">
                  <figure className="flex justify-center items-center w-10 h-10 rounded-full bg-[#999] cursor-pointer">
                    <UserRound className="text-white" />
                  </figure>
                  <button className="w-fit py-1 px-4 bg-white border-2 border-[#D9D9D9] font-light text-[#2162a1] rounded-4xl cursor-pointer">
                    <Plus className="inline-block " /> Invite
                  </button>
                </div>
              </div>
              <div className="flex self-start gap-3">
                <button className="w-fit py-1 px-4 bg-white border-2 border-[#D9D9D9] font-light rounded-4xl cursor-pointer">
                  Add item
                </button>
                <button className="w-fit py-1 px-4 bg-white border-2 border-[#D9D9D9] font-light rounded-4xl cursor-pointer">
                  <Share />
                </button>
                <button className="w-fit py-1 px-4 bg-white border-2 border-[#D9D9D9] font-light rounded-4xl cursor-pointer">
                  <Ellipsis />
                </button>
              </div>
            </div>
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-2 rounded-lg border-[#D9D9D9]"
              >
                <Link
                  to={`/productDetails/${item.id}`}
                  className="block w-full sm:w-[300px] p-4"
                >
                  <img
                    src={item.image}
                    loading="lazy"
                    className="w-[200px] object-contain"
                    alt={item.title}
                  />
                </Link>
                <div className="flex flex-col justify-between grow gap-3 p-4">
                  <h3 className="w-full font-medium text-lg">{item.title}</h3>
                  <div className="flex flex-col">
                    <div className="rating flex gap-2 items-center w-2/3">
                      <div className="stars flex items-center justify-between gap-0.5">
                        {renderStars(item.rating.rate)}
                      </div>
                      <p className="count font-normal text-[#1F8394]">
                        {item.rating.count}
                      </p>
                    </div>
                    <p className="bought font-normal text-[#717171]">
                      1k+ bought in past month
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="w-2/3">
                      <p className="font-normal text-xl">
                        ${item.price.toFixed(2)}{" "}
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
                    <div className="buttons flex gap-1 sm:gap-2">
                      <button
                        onClick={() => addProductToCart(item)}
                        className="w-fit py-1 px-4 bg-[#FFCC00] font-light rounded-4xl cursor-pointer"
                      >
                        Add to cart
                      </button>
                      <button
                        onClick={() => removeProductFromWishlist(item.id)}
                        className="w-fit py-1 px-4 bg-white border-2 border-[#D9D9D9] font-light rounded-4xl cursor-pointer"
                      >
                        Remove from list
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default WishList