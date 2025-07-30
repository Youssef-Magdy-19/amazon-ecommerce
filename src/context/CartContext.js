import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartNumber, setCartNumber] = useState();
  const [wishListNumber, setWishListNumber] = useState();
  const [dataWishList, setDataWishList] = useState([]);
  const [cartId, setCartId] = useState(null);

  let Baseurl = "https://ecommerce.routemisr.com";

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (!userToken) {
      // توليد cartId وهمي
      const localId = localStorage.getItem("localCartId") || crypto.randomUUID();
      localStorage.setItem("localCartId", localId);
      setCartId(localId);

      const localCart = JSON.parse(localStorage.getItem("localCart")) || [];
      setCartNumber(localCart.length);
    }
  }, [userToken]);

  function addToCart(productId) {
    if (userToken) {
      return axios
        .post(`${Baseurl}/api/v1/cart`, { productId }, { headers: { token: userToken } })
        .then((res) => {
          toast.success(res.data.message || "Product added to cart");
          setCartNumber(res.data.numOfCartItems);
          return res;
        })
        .catch((err) => {
          toast.error("Failed to add to cart");
          return err;
        });
    } else {
      let localCart = JSON.parse(localStorage.getItem("localCart")) || [];
      if (!localCart.includes(productId)) {
        localCart.push(productId);
        localStorage.setItem("localCart", JSON.stringify(localCart));
        toast.success("Product added to temporary cart");
        setCartNumber(localCart.length);
      } else {
        toast.info("Product already in temporary cart");
      }
      return Promise.resolve({ local: true, productId });
    }
  }

  function getCart() {
    if (!userToken) return;
    return axios
      .get(`${Baseurl}/api/v1/cart`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        let cartNum = res.data.numOfCartItems || "";
        setCartNumber(cartNum);
        setCartId(res.data.data._id);
        localStorage.setItem("userId", res.data.data.cartOwner);
        return res;
      })
      .catch(() => {});
  }

  function updateCart(id, count) {
    return axios.put(
      `${Baseurl}/api/v1/cart/${id}`,
      { count },
      { headers: { token: userToken } }
    );
  }

  function deleteCart(id) {
    return axios.delete(`${Baseurl}/api/v1/cart/${id}`, {
      headers: { token: userToken },
    });
  }

  function clearCart() {
    return axios.delete(`${Baseurl}/api/v1/cart`, {
      headers: { token: userToken },
    });
  }

  function checkOutPayment(id, formDeta) {
    if (!userToken) {
      toast.error("Please log in to proceed with payment.");
      return Promise.reject("Unauthorized");
    }

    return axios.post(
      `${Baseurl}/api/v1/orders/checkout-session/${id}?url=https://freshcart-sherif-el-sheikhs-projects.vercel.app/`,
      {
        shippingAddress: formDeta,
      },
      {
        headers: {
          token: userToken,
        },
      }
    );
  }

  function addToWishList(id) {
    return axios.post(
      `${Baseurl}/api/v1/wishlist`,
      { productId: id },
      { headers: { token: userToken } }
    );
  }

  async function getWishList() {
    return axios
      .get(`${Baseurl}/api/v1/wishlist`, {
        headers: { token: userToken },
      })
      .then((res) => {
        let wishNum = res.data.data.length || "";
        setWishListNumber(wishNum);
        return res;
      })
      .catch((err) => err);
  }

  function deleteWishList(id) {
    return axios.delete(`${Baseurl}/api/v1/wishlist/${id}`, {
      headers: { token: userToken },
    });
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        cartNumber,
        setCartNumber,
        getCart,
        updateCart,
        deleteCart,
        clearCart,
        checkOutPayment,
        wishListNumber,
        setWishListNumber,
        addToWishList,
        getWishList,
        deleteWishList,
        dataWishList,
        setDataWishList,
        cartId,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
