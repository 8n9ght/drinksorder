/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {

    const [notificationPermission, setNotificationPermission] = useState();
  
    const requestNotificationPermission = () => {
      console.log('Requesting permission')
      Notification.requestPermission()
          .then((permission) => {
            if (!("Notification" in window)) {
              // Check if the browser supports notifications
              alert("This browser does not support desktop notification");
            }
            else{
              if (permission === "granted") {
                  console.log("Permission granted");
              } else {
                  console.log("Permission denied");
              }
            }
          })
          .catch((error) => {
              console.error("Error requesting notification permission:", error);
          });
  };

  const enableNotifications = () => {
    setNotificationPermission("granted");
  }
  
  const disableNotifications = () => {
    setNotificationPermission("denied");
  }
    
    const navigate = useNavigate()

    const [identifier, setIdentifier] = useState(localStorage.getItem('identifier') || '');
    
    const handleChange = event => {
        setIdentifier(event.target.value);
        localStorage.setItem('identifier', event.target.value);
    };

    const goToBeverages = () => {
        navigate('/menu')
    }

    return (
        <div className="container">
            <header className="homeHeader">
                <p>Welcome to</p>
                <h1>J-A's Tavern</h1>
            </header>

            <div className="content">
                <input type="text" value={identifier} onChange={handleChange} placeholder="Entrez votre pseudo, nom ou prénom"/>
                <button onClick={goToBeverages}>Découvrir les boissons</button>
            </div>

            
            {notificationPermission !== "granted" && <button onClick={requestNotificationPermission}>Activer les notifications</button>}
            {notificationPermission !== "granted" && <button onClick={disableNotifications}>Non merci</button>}
            

            <div>
                <Link to="/admin">🤓</Link>
            </div>
        </div>
    )
}

export default Home;