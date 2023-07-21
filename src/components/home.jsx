/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {

    const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  
    const requestNotificationPermission = () => {
      Notification.requestPermission()
        .then((permission) => {
          setNotificationPermission("granted");
          if(permission === "granted"){
            console.log("permisison granted")
          } else {
            console.log("permission denied")
          }
        })
        .catch((error) => {
          console.error("Error requesting notification permission:", error);
        });
    };
    
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

            
            <button onClick={requestNotificationPermission}>Activer les notifications</button>
            

            <div>
                <Link to="/admin">🤓</Link>
            </div>
        </div>
    )
}

export default Home;