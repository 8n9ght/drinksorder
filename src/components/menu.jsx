import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="container">
            <header>
                <h1>Le choix du roi</h1>
            </header>

            <div>
                <Link to="/cocktails">Cocktails</Link>
                <Link to="/mocktails">Mocktails</Link>
                <Link to="/spirits">Spiritueux</Link>
                <Link to="/shots">Shots</Link>
            </div>
        </div>
    )
}

export default Menu;