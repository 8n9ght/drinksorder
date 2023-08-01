/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import addNotification from 'react-push-notification';


function Cocktails() {

  const [drinks, setDrinks] = useState([]);

  let apiUrl;
  let ordersUrl;

  let user = localStorage.getItem("identifier");

  if (process.env.NODE_ENV === "development") {
    apiUrl = "http://localhost:5000/cocktails/";
  } else {
    apiUrl = "https://ineedadrink.onrender.com/cocktails/";
  }

  if (process.env.NODE_ENV === "development") {
    ordersUrl = "http://localhost:5000/orders/";
  } else {
    ordersUrl = "https://ineedadrink.onrender.com/orders/";
  }

  const handleOrder = (name, ingredients) => {
    axios.post(ordersUrl, { name, ingredients })
      .then((res) => {
        alert("Ta commande a bien été passée")
        /* addNotification({
          title: 'Warning',
          subtitle: 'This is a subtitle',
          message: 'This is a very long message',
          native: true
        }); */
      })
      .catch((error) => {
        console.error("Une erreur est survenue à la création de la commande:", error);
      });
  };

  useEffect(() => {
    axios.get(apiUrl, { withCredentials: true }).then((res) => {
      setDrinks(res.data);
    });
  }, []);

  return (
    <div className="container">
      <header>
        <Link to="/menu" className="back">
          Back
        </Link>
        <h1>Cocktails</h1>
      </header>

      <div className="drinks">
        {drinks.map((drink) => {
          return (
            <div className="drinkItem" key={drink.name}>
              <p className="drinkName">{drink.name}</p>
              <article className="drinkIngredients">
                {drink.ingredients.map((igd, index) => {
                  return (
                    <p key={Math.random()}>
                      {igd}
                      {index < drink.ingredients.length - 1 ? "," : ""}
                    </p>
                  );
                })}
                {user ? (
                  <button
                    onClick={() => handleOrder(drink.name, drink.ingredients)}
                  >
                    Order
                  </button>
                ) : null}
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cocktails;
