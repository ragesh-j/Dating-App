import React, { useState, useEffect, useContext } from 'react';
import CheckoutStyle from './checkout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../routing/CartProvider';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const CheckoutPage = () => {
  const {cartItems,setCartItems}=useContext(CartContext)
    const location=useLocation()
    const cart=location.state?.cart
    const navigate=useNavigate()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    phone: '',
    pinCode:''
  });
  const[stages,setStages]=useState({
    address:true,
    confirmOrder:false
  })
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://localhost:8000/ecommerce/addresses', {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setAddresses(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/ecommerce/addresses', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(newAddress)
      });
      const data = await response.json();
      if (response.ok) {
        setAddresses([...addresses, data]);
        setShowAddressForm(false);
        setNewAddress({ name: '', address: '', phone: '' ,pinCode:''});
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  
  const handleCancel = () => {
     setShowAddressForm(false);
    };
    const handlePlaceOrder = async (orderPayload) => {
     
      try {
        const response = await fetch('http://localhost:8000/ecommerce/place-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          },
          body: JSON.stringify(orderPayload)
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Order placed:', data);
          if(orderPayload.cartId){
            setCartItems([])
          }
          navigate(`/eCommerce-home/success/${data._id}`)
        } else {
          console.error('Failed to place order:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to place order:', error);
      }
    };
    
  useEffect(() => {
    if (addresses.length === 1) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses]);

  async function displayRazorpay(orderPayload) {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:8000/razorpay', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
			  },
			  body:JSON.stringify({amount:cart.totalPrice})
		}).then((t) =>
			t.json()
		)
		

		console.log(data)

		const options = {
			key:  'rzp_test_nJTJIRuTTgGOpq',
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			name: 'E commerce',
			description: 'Transaction',
			
			handler:async function (response) {
				await handlePlaceOrder(orderPayload)
        
			},
			prefill: {
				name:'Ragesh',
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
  return (
    <div className={CheckoutStyle.checkout_container}>
      <div className={CheckoutStyle.left_section}>
        <h2>1.Delivery Address</h2>
        {stages.address && <>{addresses.map(address => (
          <div key={address._id}  className={`${CheckoutStyle.address_box} ${selectedAddress === address._id ? CheckoutStyle.selected : ''}`} onClick={() => setSelectedAddress(address._id)}>
            <p><strong>{address.name}</strong></p>
            <p>{address.address}</p>
            <p>Phone: {address.phone}</p>
            <p>Pin Code:{address.pinCode}</p>
            {selectedAddress === address._id&&<button className={CheckoutStyle.place_order_btn} onClick={()=>setStages({...stages,address:false,confirmOrder:true})}>Deliver Here</button>}
          </div>
        ))}
         <button className={CheckoutStyle.add_address_btn} onClick={handleAddAddress}>
          Add Delivery Address
        </button></>}

        <h2>2.Payment Option</h2>
        {stages.confirmOrder&&<>{
            <div className={CheckoutStyle.paymentSection}>
            <div className={CheckoutStyle.paymentOption}>
              <input 
                type="radio" 
                id="cod" 
                name="paymentMethod" 
                value="COD" 
                checked={paymentMethod === 'COD'} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
              />
              <label htmlFor="cod">Cash on Delivery (COD)</label>
            </div>
            <div className={CheckoutStyle.paymentOption}>
              <input 
                type="radio" 
                id="prepaid" 
                name="paymentMethod" 
                value="Prepaid" 
                checked={paymentMethod === 'Prepaid'} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
              />
              <label htmlFor="prepaid">Prepaid</label>
            </div>
            {paymentMethod&&<button  className={CheckoutStyle.placeOrderBtn} onClick={()=>{
              const orderPayload = {
                items: cart.items.map(item => ({
                  itemId: item.itemId._id, 
                  quantity: item.quantity,
                  price:item.price
                })),
                addressId: selectedAddress, 
                paymentMethod: paymentMethod,
                totalPrice: cart.totalPrice
              };
            
              if (cart._id) {
                orderPayload.cartId = cart._id; 
              }
              if(paymentMethod==="COD"){
                handlePlaceOrder(orderPayload)
              }else{
                displayRazorpay(orderPayload)
              }
              
            }}>Place Order</button>}
          </div>
        }</>}
      </div>
      <div className={CheckoutStyle.right_section}>
        <div className={CheckoutStyle.price_details}>
          <h2>Price Details</h2>
          <div className={CheckoutStyle.price_box}>
            <p>Price ({cart.items.length} item): <span>₹{cart.totalPrice}</span></p>
            <p>Delivery Charges: <span className={CheckoutStyle.free}>Free</span></p>
            <h3>Total: <span>₹{cart.totalPrice}</span></h3>
          </div>
        </div>
      </div>
      
      {showAddressForm && (
        <div className={CheckoutStyle.modal}>
          <div className={CheckoutStyle.modal_content}>
            <form className={CheckoutStyle.address_form} onSubmit={handleAddressSubmit}>
              <h2>Add New Address</h2>
              <input type="text" name="name" placeholder="Name"value={newAddress.name} onChange={handleAddressChange} required />
              <input type="text" name="address" placeholder="Address" value={newAddress.address} onChange={handleAddressChange} required />
              <input type="text" name="phone" placeholder="Phone" value={newAddress.phone} onChange={handleAddressChange} required />
               <input type="text" name="pinCode" placeholder="pincode" value={newAddress.pinCode} onChange={handleAddressChange} required />
              <div className={CheckoutStyle.form_actions}>
                <button type="submit" className={CheckoutStyle.save_address_btn}>Save Address</button>
                <button type="button" className={CheckoutStyle.cancel_btn} onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;