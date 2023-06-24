const Admin = () => {
    return (
        <div className="container">
            <header>
                <h1>Baccus Hideout</h1>
            </header>

            <div className="adminForm">
                <input type="text" max={10}></input>
                <input type="password" max={10}></input>
                <button>Go Hangover</button>
            </div>
        </div>
    )
}

export default Admin;