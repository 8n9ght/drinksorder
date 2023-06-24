import { Link } from "react-router-dom";

const DrinkManagement = () => {
    return (
        <div className="container">
            <header>
                <h1>Drinks Management</h1>
            </header>

            <div className="beverage">
                <Link to="/cocktails">Manage Drinks</Link>
                <Link to="/mocktails">Add drinks</Link>
            </div>
        </div>
    )
}

export default DrinkManagement;