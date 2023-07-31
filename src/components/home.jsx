/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let apiUrl;

  const [notificationPermission, setNotificationPermission] =
    useState("default");

  if (process.env.NODE_ENV === "development") {
    apiUrl = "http://localhost:5000/users/create";
  } else {
    apiUrl = "https://ineedadrink.onrender.com/users/create";
  }

  const requestNotificationPermission = () => {
    console.log("Requesting permission");
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("Permission granted");
          setNotificationPermission("granted");
        } else {
          console.log("Permission denied");
          setNotificationPermission("denied");
        }
      })
      .catch((error) => {
        console.error("Error requesting notification permission:", error);
      });
  };

  const disableNotifications = () => {
    setNotificationPermission("denied");
    navigate("/menu");
  };

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(
    localStorage.getItem("identifier") || ""
  );

  const handleChange = (event) => {
    setIdentifier(event.target.value);
    localStorage.setItem("identifier", event.target.value);
  };

  const handleSubscribe = () => {
    if (identifier === "") {
      alert("Veuillez renseigner le champ");
    } else {
      axios
        .post(apiUrl, { name: identifier })
        .then((response) => {
          console.log("Utilisateur temporaire enregistré avec succès !");
          navigate("/menu");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'enregistrement de l'utilisateur temporaire :",
            error
          );
        });
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered!", registration);
        })
        .catch((error) => {
          console.error("Error registering Service Worker:", error);
        });
    }
  }, []);

  return (
    <div className="container">
      <header className="homeHeader">
        <p>Welcome to</p>
        <h1>J-A's Tavern</h1>
      </header>

      <div className="content">
        {notificationPermission !== "granted" && (
          <div className="notifsPerm">
            <p>
              Pour profiter d'une expérience complète active les notifications
            </p>
            <button onClick={requestNotificationPermission}>
              Oui, je veux commander
            </button>
            <button onClick={disableNotifications}>
              Je regarde juste la carte !
            </button>
          </div>
        )}

        {notificationPermission === "granted" && (
          <div className="homeForm">
            <input
              type="text"
              value={identifier}
              onChange={handleChange}
              placeholder="Entrez votre pseudo, nom ou prénom"
            />
            <button onClick={handleSubscribe}>Découvrir la carte</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
