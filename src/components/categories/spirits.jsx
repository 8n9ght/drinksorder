import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Spirits() {
    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        axios.get("https://ineedadrink.onrender.com/spirits")
        .then((res) => {
            setDrinks(res.data)
        }, [])
    })
  return (
    <div className="container">
      <header>
        <h1>Spirits</h1>
      </header>

      <div className="drinks">
        {drinks.map((drink) => {
          return(
            <div className="drinkItem">
              <p className="drinkName">{drink.name}</p>
              {drink.available === true ? <p>Disponible</p> : <p>En rupture</p>}
            </div>
          )
        })}
      </div>
</div>
  )
}

export default Spirits;