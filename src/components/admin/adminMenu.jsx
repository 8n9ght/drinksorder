import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div className="container">
            <header>
                <h1>Choose a path</h1>
            </header>

            <div className="menuLinks">
                <Link to="/cocktails">Manage Drinks</Link>
                <Link to="/mocktails">Add drinks</Link>
            </div>
        </div>
    )
}

export default AdminMenu;