import axios from "axios";
import { useEffect, useState } from "react";

const DrinkManagement = () => {

    const [beverages, setBeverages] = useState()


    useEffect(() => {
        axios.get('https://ineedadrink.onrender.com/admin/getall')
        .then((res) => {
            setBeverages(res.data);
            console.log(res.data);
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
                
            </div>
        </div>
    )
}

export default DrinkManagement;