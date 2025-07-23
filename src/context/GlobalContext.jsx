import { createContext, useEffect, useState } from "react";

// @ts-ignore
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Wishlist Context
  const [wishlist, setWishlist] = useState(() => {
    try {
      const wishlistItems = localStorage.getItem("wishlistItems");
      return wishlistItems ? JSON.parse(wishlistItems) : [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist]);

  // addProductToWishlist
  const addProductToWishlist = (product) => {
    setWishlist((prevProducts) => {
      const addedProduct = prevProducts.some((i) => i.id === product.id);
      if (addedProduct) {
        console.log("This product is already added to your wishlist");
        return prevProducts;
      } else {
        console.log("Product added to your wishlist");
        return [...prevProducts, product];
      }
    });
  };

  // removeProductFromWishlist
  const removeProductFromWishlist = (id) => {
    setWishlist((prevProducts) => {
      const removedProduct = prevProducts.some((i) => i.id === id);
      if (removedProduct) {
        console.log("This product removed from your wishlist");
        return prevProducts.filter((i) => i.id !== id);
      } else {
        console.log("This product is not found in your wishlist");
        return prevProducts;
      }
    });
  };

  // isInWishlist
  const isInWishlist = (id) => {
    return wishlist.some((i) => i.id === id);
  };

  // Cart Context
  const [cart, setCart] = useState(() => {
    try {
      const cartList = localStorage.getItem("cartList");
      return cartList ? JSON.parse(cartList) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cart));
  }, [cart]);

  // addProductToCart
  const addProductToCart = (product) => {
    setCart((prevProducts) => {
      const addedProduct = prevProducts.some((i) => i.id === product.id);
      if (addedProduct) {
        console.log("This product is already added to your cart");
        return prevProducts;
      } else {
        console.log("Product added to your cart");
        return [...prevProducts, product];
      }
    });
  };

  // removeProductFromCart
  const removeProductFromCart = (id) => {
    setCart((prevProducts) => {
      const removedProduct = prevProducts.some((i) => i.id === id);
      if (removedProduct) {
        console.log("This product removed from your cart");
        return prevProducts.filter((i) => i.id !== id);
      } else {
        console.log("This product is not found in your cart");
        return prevProducts;
      }
    });
  };

  // removeAllProductFromCart
  const removeAllProductFromCart = () => {
    setCart([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        wishlist,
        addProductToWishlist,
        removeProductFromWishlist,
        isInWishlist,
        cart,
        addProductToCart,
        removeProductFromCart,
        removeAllProductFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
