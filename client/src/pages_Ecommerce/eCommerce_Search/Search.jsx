
import { useContext, useEffect, useState } from 'react'
import EcomSearchStyle from './ecommerceSearch.module.css'
import { CartContext } from '../../routing/CartProvider'
import { useNavigate } from 'react-router-dom'
function Search(){
    const{searchInput,setSearchInput}=useContext(CartContext)
    const [categorie,setCategories]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchItems=async()=>{
          try{
            const response=await fetch(`http://localhost:8000/ecommerce/categories-with-search-items/${searchInput}`,{
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
      },[searchInput])
    return <>
            <div className={EcomSearchStyle.container}>
            <main>
              {categorie.map(category => (
                <section key={category._id} className={EcomSearchStyle.category_section}>
                  <h2>{category.name}</h2>
                  <div className={EcomSearchStyle.items_grid}>
                    {category.items.map(item => (
                      <div key={item.id} className={EcomSearchStyle.item} onClick={()=>navigate(`/eCommerce-home/product-view/${item.id}`)}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </main>
          </div>
    
    </>
}

export default Search