/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import * as PusherPushNotifications from "@pusher/push-notifications-web";


function Cocktails() {

    const beamsClient = new PusherPushNotifications.Client({
      instanceId: 'a8bc86fb-f6d9-4bc3-840e-47ede58169af',
    });

    const item = useRef()

    const user = localStorage.getItem('identifier')

    const [drinks, setDrinks] = useState([])

    let apiUrl;
    let ordersUrl;
    
  
    if (process.env.NODE_ENV === "development") {
        apiUrl = 'http://localhost:5000/cocktails/';
    } else {
        apiUrl = 'https://ineedadrink.onrender.com/cocktails/';
    }
    
    if (process.env.NODE_ENV === "development") {
      ordersUrl = 'http://localhost:5000/orders/';
    } else {
      ordersUrl = 'https://ineedadrink.onrender.com/orders/';
    }


    const handleOrder = (name, ingredients) => {

      beamsClient
      .start()
      .then((beamsClient) => beamsClient.getDeviceId())
      .then(() => beamsClient.addDeviceInterest("hello"))
      .then(() => {
        console.log(name, ingredients)
        axios.post(ordersUrl, {name, ingredients})
        .then((res) => {
          console.log("Order created:", res.data);
        })
        .catch((error) => {
          console.error("Error creating order:", error);
        });
      })
      .catch(console.error);
    }

    useEffect(() => {
        axios.get(apiUrl, { withCredentials: true })
        .then((res) => {
            setDrinks(res.data)
        })
    }, [])

  return (
    <div className="container">
      <header>
        <Link to="/menu" className="back">Back</Link>
        <h1>Cocktails</h1>
      </header>

      <div className="drinks">
        {drinks.map((drink) => {
          return(
            <div className="drinkItem" key={drink.name} ref={item}>
              <p className="drinkName">{drink.name}</p>
              <article className='drinkIngredients'>
              {drink.ingredients.map((igd, index) => {
                return(
                  <p key={Math.random()}>{igd}{(index < drink.ingredients.length - 1) ? ',' : ''}</p>
                )
              })}
              {user ? <button onClick={() => handleOrder(drink.name, drink.ingredients)}>Order</button> : null}
              </article>
            </div> )
        })}
      </div>
</div>
  )
}

export default Cocktails;
