// pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CartProductCard from "../Components/CartProductCard";
import CartEmpty from "../Components/CartEmpty";
import SavedForLater from "../Components/SavedForLater";
import { ChevronRight } from "lucide-react";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { cartItems, clearCart } = useCart();
  const savedForLater = JSON.parse(localStorage.getItem('savedForLater')) || [];

  // حساب السعر الكلي
  let totalPrice = 0;
  cartItems.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  // حساب عدد السلع
  let numberOfGoods = 0;
  cartItems.forEach((product) => {
    numberOfGoods += product.quantity;
  });

  useWindowScrollToTop();

  return (
    <section className="cartPage bg-white md:bg-gray-200" style={{ padding: '10px 15px' }}>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="flex flex-col-reverse lg:flex-row md:items-start gap-[.75rem]">
          <div className="showProductsCard bg-white w-full lg:min-w-[300px] flex-1">
            <div className="flex justify-between items-end md:border-b border-gray-300" style={{ margin: '0 15px' }}>
              <h3 className="hidden md:block text-xl md:text-2xl font-semibold" style={{ padding: '10px 0' }}>
                Shopping Cart
              </h3>
              <p className="text-gray-700 hidden md:block">Price</p>
            </div>

            <button
              className="text-blue-600 block md:hidden my-2"
              onClick={clearCart}
            >
              Delete All
            </button>

            <div className="flex flex-col gap-[.5rem] md:gap-0">
              {cartItems.map((product, index) => (
                <CartProductCard
                  key={index}
                  product={product}
                  image={product.image}
                  title={product.title}
                  count={product.count}
                  quantity={product.quantity}
                  id={product.id}
                  price={product.price}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-[1.5rem]">
              <button
                className="bg-white border rounded-full hidden md:block"
                style={{ padding: ".5px 10px", marginLeft: '15px' }}
                onClick={clearCart}
              >
                Delete All
              </button>
              <p
                className="hidden md:block text-right"
                style={{ margin: '0 15px', padding: '10px 0' }}
              >
                Subtotal (for {numberOfGoods} goods) : <span className="font-bold">{totalPrice.toFixed(2)} EGP</span>
              </p>
            </div>
          </div>

          <div className="completeBuy bg-white flex flex-col gap-[.6rem]" style={{ padding: '30px 20px' }}>
            <p>Subtotal (for {numberOfGoods} goods) : <span className="font-bold">{totalPrice.toFixed(2)} EGP</span></p>
            <button
              className="bg-yellow-400 rounded-full w-full hover:bg-yellow-500"
              style={{ padding: '5px 12px' }}
              onClick={() => navigate('/checkout')}
            >
              Checkout ({numberOfGoods} goods)
            </button>
          </div>
        </div>
      )}

      {savedForLater.length !== 0 && <SavedForLater />}

      {cartItems.length !== 0 && (
        <div className="py-2 bg-white mt-2">
          <button
            className="flex justify-between items-center w-full p-3 border-b border-t border-gray-300 font-semibold cursor-pointer"
            onClick={() => { user && navigate('/products') }}
          >
            Follow up Shopping
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
