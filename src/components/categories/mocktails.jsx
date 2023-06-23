import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Mocktails() {
    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        axios.get("https://ineedadrink.onrender.com/mocktails")
        .then((res) => {
            setDrinks(res.data)
        }, [])
    })
  return (
    <div className="container">
      <header>
        <h1>Mocktails</h1>
      </header>

      <div className="drinks">
        {drinks.map((drink) => {
          return(
            <div className="drinkItem">
              <p className="drinkName">{drink.name}</p>
              <article className='drinkIngredients'>
                {drink.ingredients.map((igd) => {
                  return(
                    <p>{igd}</p>
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