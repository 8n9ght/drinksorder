import axios from "axios";
import { useEffect, useState } from "react";

const DrinkManagement = () => {

    const [beverages, setBeverages] = useState()
    axios.defaults.withCredentials = true;
    axios.defaults.origin = true;


    useEffect(() => {
        axios.get('https://ineedadrink.onrender.com/admin/getall')
        .then((res) => {
            setBeverages(res)
            console.log(beverages);
        })
    })

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