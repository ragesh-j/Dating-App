import { useEffect, useState } from "react";
import successImg from "../../assets/success.png"
import sucessStyle from'./success.module.css'
import { useNavigate, useParams } from "react-router-dom";

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
function OrderSuccess(){
    
        const {id}=useParams()
        const navigate=useNavigate()
        const [orderDetails,setOrderDetails]=useState([{
            _id:"",
            addressDetails:{
                name:""
            }
        }])
        useEffect(()=>{
            const fetchOrderDetails=async()=>{
                try{
                    const response=await fetch(`http://localhost:8000/ecommerce/order-placed/${id}`,{
                        headers:{
                            'Content-type':'application/json',
                            'Authorization':`Bearer ${localStorage.getItem('jwtToken')}`
                        }
                    })
                    const data=await response.json()
                    if(response.ok){
                        setOrderDetails(data)
                    }
                }catch(err){
                    console.log(err)
                }
            }
            fetchOrderDetails()
        },[])

    return (
        <>
        
        {orderDetails ? <div className={sucessStyle.order_success_container}>
          <div className={sucessStyle.order_success_box}>
            <img
              src={successImg}
              alt="Order Success"
              className={sucessStyle.success_image}
            />
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been placed successfully. Thank you for shopping with us!</p>
            <div className={sucessStyle.order_details}>
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong>{orderDetails[0]._id}</p>
              <p><strong>Order Date:</strong>{formatDate(orderDetails[0].placedAt)} </p>
              <p><strong>Total Amount:</strong>₹{orderDetails[0].totalPrice}</p>
            </div>
            <div className={sucessStyle.delivery_details}>
              <h3>Delivery Details</h3>
              <p><strong>Address:</strong>{`${orderDetails[0].addressDetails.name}, ${orderDetails[0].addressDetails.address} ${orderDetails[0].addressDetails.pinCode}`}</p>
              <p><strong>Payment Method:</strong>{orderDetails[0].paymentMethod}</p>
            </div>
            <button className={sucessStyle.continue_shopping_btn} onClick={()=>{
                navigate("/eCommerce-home")}}>
              Continue Shopping
            </button>
          </div>
        </div>:null}
        </>
      );
    };
export default OrderSuccess