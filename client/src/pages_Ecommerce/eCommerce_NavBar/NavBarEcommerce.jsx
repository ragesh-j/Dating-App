import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EcomNavStyle from './ecommerceNavBar.module.css';
import addToCart from '../../assets/shopping-cart.png'
import { CartContext } from '../../routing/CartProvider';
const NavbarEcom = () => {
  const{cartItems}=useContext(CartContext)
  const navigate=useNavigate()
  
  return (
    <nav className={EcomNavStyle.navbar}>
      <div className={EcomNavStyle.navbar_brand}>
        <Link to="/">E-Commerce</Link>
      </div>
      <div className={EcomNavStyle.navbar_search}>
        <input type="text" placeholder="Search products..." />
        <button type="button">Search</button>
      </div>
      <div className={EcomNavStyle.navbar_addToCart} onClick={()=>navigate("/eCommerce-home/cart")}>
           {cartItems.length>0 &&<span>{cartItems.length}</span>}
            <img src={addToCart} alt='img'/>
            
      </div>
    </nav>
  );
};

export default NavbarEcom;