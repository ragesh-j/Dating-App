import EcomHomeStyle from './eCommerce.module.css'

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../routing/CartProvider';
function EcommereceHome(){
   const {cartItems,setCartItems}=useContext(CartContext)
      const navigate=useNavigate()
      const [categorie,setCategories]=useState([])
      
      const[isAdded,setIsAdded]=useState(false)
      useEffect(()=>{
        const fetchItems=async()=>{
          try{
            const response=await fetch('http://localhost:8000/ecommerce/categories-with-items',{
              headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
              }
            })
            const data=await response.json()
            if(response.ok){
            setCategories(data)
            }
          }catch(err){
            console.log(err)
          }
      }
      fetchItems()
      },[])
      useEffect(()=>{
         
          const fetchCartItems = async () => {
            try {
              const response = await fetch('http://localhost:8000/ecommerce/get-cart', {
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
              });
              const data = await response.json();
              if(response.ok){
              setCartItems(data.items);
              }
            } catch (err) {
              console.log(err);
            }
          };
          
          fetchCartItems();
          
      },[isAdded])
      const handleAddToCart = async (itemId) => {
        try {
          const response = await fetch('http://localhost:8000/ecommerce/add-to-cart', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            },
            body: JSON.stringify({ itemId })
          });
          const data = await response.json();
          if(response.ok){
          setIsAdded(prev=>!prev);
          }
        } catch (err) {
          console.log(err);
        }
      };
      const isInCart = (itemId) => {
        return cartItems.some(item => item.itemId._id === itemId);
      };
        return (
          <div className={EcomHomeStyle.container}>
            <main>
              {categorie.map(category => (
                <section key={category._id} className={EcomHomeStyle.category_section}>
                  <h2>{category.name}</h2>
                  <div className={EcomHomeStyle.items_grid}>
                    {category.items.map(item => (
                      <div key={item.id} className={EcomHomeStyle.item} onClick={()=>navigate(`/eCommerce-home/product-view/${item.id}`)}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <div className={EcomHomeStyle.btn_div}>
                        {isInCart(item.id) ? (
                      <button className={EcomHomeStyle.go_to_cart} onClick={(e) => {
                        e.stopPropagation();
                        navigate('/eCommerce-home/cart');
                      }}>Go to Cart</button>
                    ) : (
                      <button className={EcomHomeStyle.add_to_cart} onClick={async(e) => {
                        e.stopPropagation();
                        await handleAddToCart(item.id)
                      }}>Add to Cart</button>
                    )}
                       </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </main>
          </div>
        );
      };
    
      export default EcommereceHome;
