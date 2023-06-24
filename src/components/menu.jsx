import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="container">
            <header>
                <Link to="/" className="back">Back</Link>
                <h1>Choisir un remède</h1>
            </header>

            <div className="menuLinks">
                <Link to="/cocktails">Cocktails</Link>
                <Link to="/mocktails">Mocktails</Link>
                <Link to="/spirits">Spiritueux</Link>
                <Link to="/shots">Shots</Link>
            </div>
        </div>
    )
}

export default Menu;