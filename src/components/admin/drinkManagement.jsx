import axios from "axios";
import { useEffect, useState } from "react";

const DrinkManagement = () => {

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


    useEffect(()  => {
        try{
            axios.get(apiUrl, { withCredentials: true })
            .then((res) => {
                setBeverages(res.data);
            })
        }catch(error){
            console.error("There was an error!", error);
        };
    }, [])

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
                <h1>Drinks Management</h1>
            </header>

            <div className="beverages">
                {beverages.map((el) => {
                    return(
                        <div className="beverageItem" key={el.name} key={el.id}>
                            <div className="beverageContent">
                                <h2>{el.name}</h2>
                                <article className="beverageIngredients">
                                    {el.ingredients.map((item) => {
                                        return(
                                            <p>{item}</p>
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