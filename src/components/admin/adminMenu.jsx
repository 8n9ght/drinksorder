import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminMenu = () => {

    const navigate = useNavigate();

    const logout = async () => {
        let logoutUrl;
      
        if (process.env.NODE_ENV === "development") {
            logoutUrl = 'http://localhost:5000/admin/logout';
        } else {
            logoutUrl = 'https://ineedadrink.onrender.com/admin/logout';
        }
        
        try {
            const response = await axios.get(logoutUrl, { withCredentials: true });
            if (response.status === 200) {
                console.log('Logged out successfully');
                navigate('/admin')
            }
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Welcome to the Lab</h1>
                <p onClick={logout} className="logout">Logout</p>
            </header>

            <h3 className="adminMenuText">What do you want to do ?</h3>

            <div className="menuLinks">
                <Link to="/drinkmanagement">Manage Drinks 🍸</Link>
                <Link to="/adddrink">Add drinks 🪄</Link>
            </div>
        </div>
    )
}

export default AdminMenu;