import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Cocktails() {
    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        axios.get("https://ineedadrink.onrender.com/cocktails")
        .then((res) => {
            setDrinks(res.data)
        }, [])
    })
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

export default Cocktails;