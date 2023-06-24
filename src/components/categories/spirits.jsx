import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

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
        <Link to="/menu" className="back">Back</Link>
        <h1>Spirits</h1>
      </header>

      <div className="drinks">
        {drinks.map((drink) => {
          return(
            <div className="drinkItem" key={drink.name}>
              <p className="drinkName">{drink.name}</p>
              {drink.available === true ? <p className="drinkDatas">Disponible</p> : <p className="drinkDatas">En rupture</p>}
            </div>
          )
        })}
      </div>
</div>
  )
}

export default Spirits;