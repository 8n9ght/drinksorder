const AddDrink = () => {
    return (
        <div className="container">
            <header>
                <h1>Add a new drink</h1>
            </header>

            <div className="addForm">
                <label htmlFor="name">Nom</label>
                <input type="text" max={10} name="name" id="name"></input>

                <label htmlFor="ingredients">Ingrédients</label>
                <input type="text" max={10} name="ingredients" id="ingredients"></input>

                <label htmlFor="image">Photo</label>
                <input type="file" name="image" id="image"></input>

                <div className="available">
                    <label>Disponibilité</label>
                    <label htmlFor="available">En stock</label>
                    <input type="checkbox" name="available" id="available" value={true} />
                    <label htmlFor="out">Rupture</label>
                    <input type="checkbox" name="out" id="out" value={false} />
                </div>

                <button>Add to the stach</button>
            </div>
        </div>
    )
}

export default AddDrink;