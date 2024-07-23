import { useContext, useEffect, useState } from 'react';
import cartStyle from'./ecommerceCart.module.css'
import { CartContext } from '../../routing/CartProvider';
import { useNavigate } from 'react-router-dom';
function Cart(){
  const {cartItems,setCartItems}=useContext(CartContext)
  const navigate=useNavigate()
    const [cart, setCart] = useState({
        items: [],
      });
      useEffect(()=>{
        const fetchCartData=async()=>{
            try{
                const response=await fetch('http://localhost:8000/ecommerce/get-cart',{
                    headers:{
                        'Content-type':'application/json',
                        'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
                    }
                })
                const data=await response.json()
                if(response.ok){
                    setCart(data)
                    await setCartItems(data.items)
                }

            }catch(err){
                console.log(err)
            }
        }
        fetchCartData()
      },[])
      const handleIncrementDecrement = async (itemId,val) => {
        const updatedItems =   cart.items.map(item =>
          item.itemId._id === itemId ? { ...item, quantity: item.quantity + val } : item
        );
        const updatedItem = updatedItems.find(item => item.itemId._id === itemId);
         setCart({ ...cart, items: updatedItems });
        
        try{
          const response=await fetch('http://localhost:8000/ecommerce/update-cart-item',{
            method:"PUT",
            headers:{
              'Content-type':'application/json',
              'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
            },
            body:JSON.stringify({itemId:updatedItem.itemId._id,quantity:updatedItem.quantity})
          })
          
          if(response.ok){
            const data=await response.json()
           setCart(data)
           
          }
        }catch(err){
          console.log(err)
        }
      };
    
      const handleRemove=async(itemId)=>{
          try{
              const response=await fetch(`http://localhost:8000/ecommerce/remove-cart-item/${itemId}`,{
                method:'DELETE',
                headers:{
                  'Content-type':'application/json',
                  'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
                }
              })
              const data=await response.json()
              if(response.ok){
                setCart(data)
                await setCartItems(data.items)
              }
          }catch(err){
            console.log(err)
          }
      }
    return (
        <div className={cartStyle.cart_container}>
        <h2>Your Cart</h2>
        {cart?.items.map(item => (
          <div key={item.itemId._id} className={cartStyle.cart_item}>
            <img src={item.itemId.image} alt={item.itemId.name} className={cartStyle.product_image} />
            <div className={cartStyle.item_details}>
              <h3>{item.itemId.name}</h3>
              <p>Price: ₹{item.price }</p>
              <p>Quantity: 
                <span>{item.quantity}</span> 
                <button disabled={item.quantity >= 10} onClick={async(e)=>{
                    handleIncrementDecrement(item.itemId._id,1)
                }}>+</button> 
                <button  disabled={item.quantity <= 1} onClick={async(e)=>{
                    handleIncrementDecrement(item.itemId._id,-1)
                }}>-</button> 
              </p>
              <button onClick={()=>handleRemove(item.itemId._id)}>Remove</button>
            </div>
          </div>
        ))}
        {cart.items.length&&<div className={cartStyle.total}>
        <p className={cartStyle.total_price}>Total Price: ₹{cart.totalPrice}</p>
        <button onClick={()=>navigate(`/eCommerce-home/checkout`,{state:{cart}}) }>Proceed</button>
        </div>}
        
      </div>
      );
    };
    
    export default Cart;