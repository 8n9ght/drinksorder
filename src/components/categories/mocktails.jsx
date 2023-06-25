import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Mocktails() {
    const [drinks, setDrinks] = useState([])

    let apiUrl;
  
    if (process.env.NODE_ENV === "development") {
        apiUrl = 'http://localhost:5000/mocktails/';
    } else {
        apiUrl = 'https://ineedadrink.onrender.com/mocktails/';
    }

    useEffect(() => {
        axios.get(apiUrl, { withCredentials: true })
        .then((res) => {
            setDrinks(res.data)
            console.log(res)
        })
    }, [])

  return (
    <div className="container">
      <header>
        <Link to="/menu" className="back">Back</Link>
        <h1>Mocktails</h1>
      </header>

      <div className="drinks">
        {drinks.map((drink) => {
          return(
            <div className="drinkItem" key={drink.name}>
              <p className="drinkName">{drink.name}</p>
              <article className='drinkIngredients'>
                {drink.ingredients.map((igd) => {
                  return(
                    <p key={Math.random()}>{igd}</p>
                  )
                })}
              </article>
            </div>
          )
        })}
      </div>
</div>
  )
}

export default Mocktails;