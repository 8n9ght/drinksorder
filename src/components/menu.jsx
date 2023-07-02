import { Link } from "react-router-dom";

const Menu = () => {

    const user = localStorage.getItem('identifier')

    return (
        <div className="container">
            <header>
                <Link to="/" className="back">Back</Link>
                {user ? <h1>{user} découvre nos remèdes</h1> : <h1>Liste des remèdes</h1>} 
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