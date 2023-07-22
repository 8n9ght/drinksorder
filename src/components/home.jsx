import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [notificationPermission, setNotificationPermission] = useState();
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState(localStorage.getItem('identifier') || '');

    const handleChange = (event) => {
        setIdentifier(event.target.value);
        localStorage.setItem('identifier', event.target.value);
    };

    const goToBeverages = () => {
        navigate('/menu');
    };

    const requestNotificationPermission = () => {
        console.log('Requesting permission');
        Notification.requestPermission()
            .then((permission) => {
                setNotificationPermission(permission);
                if (permission === "granted") {
                    console.log("Permission granted");
                } else {
                    console.log("Permission denied");
                }
            })
            .catch((error) => {
                console.error("Error requesting notification permission:", error);
            });
    };

    useEffect(() => {
        setNotificationPermission(Notification.permission === "granted");
    }, []);

    return (
        <div className="container">
            <header className="homeHeader">
                <p>Welcome to</p>
                <h1>J-A's Tavern</h1>
            </header>

            <div className="content">
                <input type="text" value={identifier} onChange={handleChange} placeholder="Entrez votre pseudo, nom ou prénom" />
                <button onClick={goToBeverages}>Découvrir les boissons</button>
            </div>

            {notificationPermission !== "granted" && <button onClick={requestNotificationPermission}>Activer les notifications</button>}
            {notificationPermission !== "granted" && <button >Non merci</button>}

            <div>
                <Link to="/admin">🤓</Link>
            </div>
        </div>
    );
};

export default Home;
