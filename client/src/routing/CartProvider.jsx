import React, { createContext, useState } from 'react';


const CartContext = createContext();

 const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [searchInput,setSearchInput]=useState("")
    
    return (
        <CartContext.Provider value={{cartItems,setCartItems,searchInput,setSearchInput}}>
            {children}
        </CartContext.Provider>
    );
};
export {
    CartProvider,
    CartContext
}