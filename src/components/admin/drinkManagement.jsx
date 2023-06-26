import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DrinkManagement = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    let apiUrl;
  
    if (process.env.NODE_ENV === "development") {
        apiUrl = 'http://localhost:5000/admin/getall';
    } else {
        apiUrl = 'https://ineedadrink.onrender.com/admin/getall';
    }

    const [beverages, setBeverages] = useState([])
    axios.defaults.withCredentials = true;

    const handlePopup = () => {
        document.getElementById('confirmDelete').classList.remove('hidden')
    }
    
    const handleClosePopup = () => {
        document.getElementById('confirmDelete').classList.add('hidden')
    }

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


    useEffect(() => {
        axios.get(apiUrl, { withCredentials: true })
            .then((res) => {
                setBeverages(res.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);
    

    return (
        <div className="container">
            <div id="confirmDelete" className="hidden">
                <header className="popupHeader">
                    <p onClick={handleClosePopup}>Close</p>
                </header>
                <h3 className="popupTitle">Confirm deletion</h3>
                <div className="popupBtn">
                    <button>Yes 🥲</button>
                    <button>No 😲</button>
                    
                </div>
            </div>

            <header>
                <Link to="/menu" className="back">Back</Link>
                <h1>Drinks Management</h1>
                <p onClick={logout} className="logout">Logout</p>
            </header>

            <div className="beverages">
                {beverages.map((el) => {
                    return(
                        <div className="beverageItem" key={el.name} >
                            <div className="beverageContent" key={el.id}>
                                <h2>{el.name}</h2>
                                <article className="beverageIngredients">
                                    {el.ingredients.map((item) => {
                                        return(
                                            <p key={item}>{item}</p>
                                        )
                                    })}
                                </article>
                            </div>
                            <article className="btnManagement">
                                <button>✏️</button>
                                <button onClick={handlePopup}>❌</button>
                            </article>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DrinkManagement;