import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {loadCartItems} from '../actions/actionList'

function Cart(props) {

   const username = useSelector(state => state.profile.username)
   const cart_items = useSelector(state => [...state.profile.cart_items])

   const dispatch = useDispatch()

   useEffect(() => {   // equivalent to component did mount for classes
     fetchAll()
   }, []);



   function handleDelete(item){

      //console.log(item)

      const data = {
        origin : "/cart",
        email : username, 
        item : item
      }

      var configuration = {
         method: "post",
         url: "http://localhost:3000/api/put",
         data: data
      }

      axios(configuration)
      .then((result) => {
         //console.log(JSON.stringify(result.data))
         fetchAll()
      })
      .catch((error) => {
         console.log(error);             
      });


   }



   function fetchAll(){
        //console.log("fetchAll")
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/findCart",
            data: { email : username}
        }

        axios(configuration)
            .then((result) => {
                const cart_items = result.data.cart_items

                //console.log(cart_items)
                dispatch(loadCartItems(cart_items));                

            })
            .catch((error) => {
                console.log(error);
            
            });
    }


   function getTotal() {
      let total = 0;
      for (var i = 0; i < cart_items.length; i++) {
         total += cart_items[i].price
      }
      return total.toFixed(2);
   }

   const lists = cart_items.map((item) =>
      <tr key={item._id} >
         <td>{item.title}</td>
         <td>{item.price}</td>
         <td><a href="#" onClick={(e) => handleDelete(item, e)}>Remove</a></td>
  
      </tr>
   );
   return (
      <table >
         <thead>
            <tr>
               <th>Title</th>
               <th>Price</th>
            </tr>
         </thead>
         <tbody>
            {lists}
            <tr>
               <td colSpan="1" style={{ textAlign: "left", color:"blue" }}>Total Amount</td>
               <td colSpan="1" style={{ textAlign: "left", color:"blue"  }}>
                  {getTotal()}
               </td>
            </tr>
         </tbody>
      </table>
   );
}
export default Cart;