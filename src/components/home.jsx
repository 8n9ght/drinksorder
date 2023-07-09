/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OneSignal from 'react-onesignal';


const Home = () => {

    const navigate = useNavigate()

    const [identifier, setIdentifier] = useState(localStorage.getItem('identifier') || '');
    
    const handleChange = event => {
        setIdentifier(event.target.value);
        localStorage.setItem('identifier', event.target.value);
    };

    const goToBeverages = () => {
        OneSignal.setExternalUserId(identifier);
        OneSignal.setSubscription(true)
        OneSignal.sendTag('order', true)
        console.log(identifier)

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

            <div>
                <Link to="/admin">🤓</Link>
            </div>
        </div>
    )
}

export default Home;