import React, {useState} from 'react';



const Login = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName] = useState('');

    const URL = "http://localhost:8080/game/";

    const handleClick = (event) => {
        event.preventDefault();
        const player = {name};
        console.log(player);
        fetch(
            URL + "addPlayer", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(player)
            }
        ).then(() => console.log("new player has been added"))
            .then(() => window.location.assign("/game"));
    }
    return (
        <div className="Login">
            <h1 style={{color: "blue"}}>Login</h1>
            <form noValidate autoComplete="off">
                <input value={name} onChange={event => setName(event.target.value)}/>
                <button onClick={handleClick}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;