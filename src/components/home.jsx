import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <header className="homeHeader">
                <p>Welcome to</p>
                <h1>J-A's Tavern</h1>
            </header>

            <div className="content">
                <Link to="/menu">Découvrir les boissons</Link>
            </div>
        </div>
    )
}

export default Home;