import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [identifier, setIdentifier] = useState(localStorage.getItem('identifier') || '');
    
    const handleChange = event => {
        setIdentifier(event.target.value);
        localStorage.setItem('identifier', event.target.value);
    };

    return (
        <div className="container">
            <header className="homeHeader">
                <p>Welcome to</p>
                <h1>J-A's Tavern</h1>
            </header>

            <div className="content">
                <Link to="/menu">Découvrir les boissons</Link>
                <input type="text" value={identifier} onChange={handleChange} placeholder="Entrez votre pseudo, nom ou prénom"/>
            </div>

            <div>
                <Link to="/admin">🤓</Link>
            </div>
        </div>
    )
}

export default Home;