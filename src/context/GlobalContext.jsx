import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// @ts-ignore
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Wishlist Context
  const [wishlist, setWishlist] = useState(() => {
    try {
      const wishlistItems = localStorage.getItem("wishlistItems");
      return wishlistItems ? JSON.parse(wishlistItems) : [];
    } catch (error) {
      toast.error("Failed to load wishlist from localStorage");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist]);

  const addProductToWishlist = (product) => {
    setWishlist((prevProducts) => {
      const exists = prevProducts.some((i) => i.id === product.id);
      if (exists) {
        toast.error("Product is already in your wishlist");
        return prevProducts;
      } else {
        toast.success("Product added to your wishlist");
        return [...prevProducts, product];
      }
    });
  };

  const removeProductFromWishlist = (id) => {
    setWishlist((prevProducts) => {
      const exists = prevProducts.some((i) => i.id === id);
      if (exists) {
        toast.success("Product removed from your wishlist");
        return prevProducts.filter((i) => i.id !== id);
      } else {
        toast.error("Product not found in your wishlist");
        return prevProducts;
      }
    });
  };

  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  // Cart Context
  const [cart, setCart] = useState(() => {
    try {
      const cartList = localStorage.getItem("cartList");
      const parsed = cartList ? JSON.parse(cartList) : [];
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch (error) {
      toast.error("Failed to load cart from localStorage");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart or increase quantity
  const addProductToCart = (product) => {
    setCart((prevProducts) => {
      const cleanedProducts = prevProducts.filter(Boolean);
      const exists = cleanedProducts.find((i) => i.id === product.id);
      if (exists) {
        toast.success("Quantity increased");
        return cleanedProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        toast.success("Product added to your cart");
        return [...cleanedProducts, { ...product, quantity: 1 }];
      }
    });
  };

  // Decrease quantity or remove item
  const decreaseProductQuantity = (id) => {
    setCart((prevProducts) => {
      const item = prevProducts.find((i) => i.id === id);
      if (!item) {
        toast.error("Product not found in cart");
        return prevProducts;
      }
      if (item.quantity === 1) {
        toast.success("Product removed from cart");
        return prevProducts.filter((i) => i.id !== id);
      } else {
        toast.success("Quantity decreased");
        return prevProducts.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });
  };

  const removeProductFromCart = (id) => {
    setCart((prevProducts) => {
      const exists = prevProducts.some((i) => i.id === id);
      if (exists) {
        toast.success("Product removed from your cart");
        return prevProducts.filter((i) => i.id !== id);
      } else {
        toast.error("Product not found in your cart");
        return prevProducts;
      }
    });
  };

  const removeAllProductFromCart = () => {
    setCart([]);
    toast.success("All products removed from your cart");
  };

  // Saved for later
  const [savedForLater, setSavedForLater] = useState(() => {
    try {
      const saved = localStorage.getItem("savedForLater");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedForLater", JSON.stringify(savedForLater));
  }, [savedForLater]);

  // Add to saved for later
  const addToSavedForLater = (product) => {
    setSavedForLater((prev) =>
      prev.some((i) => i.id === product.id) ? prev : [...prev, product]
    );
    removeProductFromCart(product.id)
  };


  // Remove from daved for later
  const removeFromSavedForLater = (id) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== id));
  };

  const isInSavedForLater = (id) => savedForLater.some((i) => i.id === id);

  // search
  const [searchResults, setSearchResults] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        wishlist,
        addProductToWishlist,
        removeProductFromWishlist,
        isInWishlist,
        cart,
        addProductToCart,
        decreaseProductQuantity,
        removeProductFromCart,
        removeAllProductFromCart,
        savedForLater,
        addToSavedForLater,
        removeFromSavedForLater,
        isInSavedForLater,
        searchResults,
        setSearchResults
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
