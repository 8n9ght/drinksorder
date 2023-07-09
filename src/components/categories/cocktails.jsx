/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import OneSignal from 'react-onesignal';

function Cocktails() {

    const user = localStorage.getItem('identifier')

    const [drinks, setDrinks] = useState([])

    let apiUrl;
  
    if (process.env.NODE_ENV === "development") {
        apiUrl = 'http://localhost:5000/cocktails/';
    } else {
        apiUrl = 'https://ineedadrink.onrender.com/cocktails/';
    }


    const handleOrder = () => {
      OneSignal.sendTag('order', true)
      console.log('something happened')
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
            <div className="drinkItem" key={drink.name}>
              <p className="drinkName">{drink.name}</p>
              <article className='drinkIngredients'>
              {drink.ingredients.map((igd, index) => {
                return(
                  <p key={Math.random()}>{igd}{(index < drink.ingredients.length - 1) ? ',' : ''}</p>
                )
              })}
              {user ? <button onClick={handleOrder}>Order</button> : null}
              </article>
            </div> )
        })}
      </div>
</div>
  )
}

export default Cocktails;
