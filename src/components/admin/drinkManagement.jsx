import axios from "axios";
import { useEffect, useState } from "react";

const DrinkManagement = () => {

    const [beverages, setBeverages] = useState()
    axios.defaults.withCredentials = true;


    useEffect(() => {
        axios.get('https://ineedadrink.onrender.com/admin/getall')
        .then((res) => {
            setBeverages(res.data);
        })
        .catch((error) => {
            console.error("There was an error!", error);
        });
    }, [])

    return (
        <div className="container">
            <header>
                <h1>Drinks Management</h1>
            </header>

            <div className="beverages">
                {beverages.map((el) => {
                    return(
                        <div className="beverages" key={el.name}>
                            <p>{el.name}</p>
                            {el.ingredients.map((item) => {
                                return(
                                    <p key={Math.random()}>{item}</p>
                                )
                            })}
                            <button>✏️</button>
                            <button>❌</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DrinkManagement;