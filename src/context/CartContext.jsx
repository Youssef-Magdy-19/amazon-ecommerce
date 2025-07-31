// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product, quantity) => {
//     const existingProduct = cartItems.find(item => item.id === product.id);

//     if (existingProduct) {
//       setCartItems(prev =>
//         prev.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         )
//       );
//     } else {
//       setCartItems(prev => [...prev, { ...product, quantity }]);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used inside a CartProvider");
//   }
//   return context;
// };



import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(Date.now().toString()); // أو أي طريقة تولد بها ID

  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === product.id?
            {...item, quantity: item.quantity + quantity }:
            item
        )
      );
    } else {
      setCartItems(prev => [...prev, {...product, quantity }]);
    }
  };

  // الأسطر دي هتديك نفس اللي بتدور عليه في Page CheckOut
  const setCartNumber = (number) => {
    setCartItems([]);
    // لو عايز تعمل منطق تاني عدّل هنا
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartId, setCartNumber }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
};
