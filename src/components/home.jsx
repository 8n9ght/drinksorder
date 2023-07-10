/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OneSignal from 'react-onesignal';


const Home = () => {

    const navigate = useNavigate()
    
    useEffect(() => {
        OneSignal.init({ appId: '5152c4b9-65fc-4dd4-bbeb-ddee35c198e1' })
    }, [])


    const [identifier, setIdentifier] = useState(localStorage.getItem('identifier') || '');
    
    const handleChange = event => {
        setIdentifier(event.target.value);
        localStorage.setItem('identifier', event.target.value);
    };

    const goToBeverages = () => {
        OneSignal.setExternalUserId(identifier);
        OneSignal.setSubscription(true)
        console.log("before tag")
        OneSignal.sendTag('order', true)
        .then(() => {
            console.log("tagged")
        })
        console.log(identifier)

        //navigate('/menu')
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