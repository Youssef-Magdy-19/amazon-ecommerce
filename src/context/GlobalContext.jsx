import { createContext, useState } from "react";

// @ts-ignore
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <GlobalContext.Provider value={{ cart, setCart, wishlist, setWishlist }}>
      {children}
    </GlobalContext.Provider>
    );
};