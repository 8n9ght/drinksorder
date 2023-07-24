/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  let apiUrl;
  let pushUrl;

  const [notificationPermission, setNotificationPermission] = useState();

  if (process.env.NODE_ENV === "development") {
    apiUrl = "http://localhost:5000/users/create";
  } else {
    apiUrl = "https://ineedadrink.onrender.com/users/create";
  }
  
  if (process.env.NODE_ENV === "development") {
    pushUrl = "http://localhost:5000/push/subscribe";
  } else {
    pushUrl = "https://ineedadrink.onrender.com/push/subscribe";
  }

  const requestNotificationPermission = () => {
    console.log("Requesting permission");
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          subscribeToPushNotifications();
          console.log("Permission granted");
        } else {
          console.log("Permission denied");
        }
      })
      .catch((error) => {
        console.error("Error requesting notification permission:", error);
      });
  };

  const subscribeToPushNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BDQAXuUBj7fACEaxZAgO5uprZa_TPUd1XtqrqORXxI8-5yg43hnQpg482BIJVszEXjp3Y3myJX3H0SnJR2ou4Co",
      });
      await axios.post(pushUrl, pushSubscription);
      console.log("Push Subscription:", pushSubscription);
    } catch (error) {
      console.error("Error subscribing to Push Notifications:", error);
    }
  };

  const disableNotifications = () => {
    setNotificationPermission("denied");
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
    axios
      .post(apiUrl, { name: identifier })
      .then((response) => {
        console.log("Utilisateur temporaire enregistré avec succès !");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement de l'utilisateur temporaire :",
          error
        );
      });
  };

  const goToBeverages = () => {
    navigate("/menu");
  };

  return (
    <div className="container">
      <header className="homeHeader">
        <p>Welcome to</p>
        <h1>J-A's Tavern</h1>
      </header>

      <div className="content">
        <input
          type="text"
          value={identifier}
          onChange={handleChange}
          placeholder="Entrez votre pseudo, nom ou prénom"
        />
        <button onClick={handleSubscribe}>Valider</button>
        <button onClick={goToBeverages}>Découvrir les boissons</button>
      </div>

      {notificationPermission !== "granted" && (
        <button onClick={requestNotificationPermission}>
          Activer les notifications
        </button>
      )}
      {notificationPermission !== "granted" && (
        <button onClick={disableNotifications}>Non merci</button>
      )}

      <div>
        <Link to="/admin">🤓</Link>
      </div>
    </div>
  );
};

export default Home;
