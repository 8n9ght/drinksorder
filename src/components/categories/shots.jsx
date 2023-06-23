import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Shots() {
    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        axios.get("https://ineedadrink.onrender.com/shots")
        .then((res) => {
            setDrinks(res.data)
        }, [])
    })
  return (
    <div className="container">
      <header>
        <h1>Shots</h1>
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

export default Shots;