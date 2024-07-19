
import { useContext, useEffect, useState } from 'react'
import ProductViewEcomStyle from './ecommerceProductView.module.css'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../routing/CartProvider'
function ProductViewEcom() {

    const { id } = useParams()
    const {cartItems,setCartItems}=useContext(CartContext)
    const [product, setProduct] = useState({
        _id: "",
        image: "",
        description: "",
        categoryId: "",
        price: "",
        name: ""
    })
    const[isAdded,setIsAdded]=useState(false)
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/ecommerce/items/${id}`, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                })
                const data = await response.json()
                if (response.ok) {

                    setProduct(data)

                }

            } catch (err) {
                console.log(err)
            }
        }
        
        fetchProduct()
        
    }, [])
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
                setCartItems(data.items)       
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
    const isAvailableInCart = (id) => {
        return cartItems.some(item => item.itemId._id === id);
      };
  

    return (<>
        <div className={ProductViewEcomStyle.product_detail_container} key={product._id}>
            <div className={ProductViewEcomStyle.product_image_container}>
                <img src={product.image} alt={product.name} className={ProductViewEcomStyle.product_image} />
                <div className={ProductViewEcomStyle.action_buttons}>
                   {isAvailableInCart(id) ?<button className={ProductViewEcomStyle.go_to_cart}>Go to Cart</button>:
                    <button className={ProductViewEcomStyle.add_to_cart} onClick={()=>handleAddToCart(id)}>Add to Cart</button>
                   }
                   <button className={ProductViewEcomStyle.buy_now}>Buy Now</button>
                </div>
            </div>
            <div className={ProductViewEcomStyle.product_details}>
                <h1>{product.name}</h1>
                <h2>₹{product.price}</h2>
                <p>{product.description}</p>
            </div>
        </div>
    </>
    )
}
export default ProductViewEcom;