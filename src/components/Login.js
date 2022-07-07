import React, {useState} from 'react';


const Login = () => {
    const [name, setName] = useState('');

    const URL = "http://localhost:8080/game/";

    const inputStyle = {
        display: "inline",
        fontFamily: "inherit",
        fontSize: "1rem",
        fontWeight: "400",
        color: "#212529",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #bdbdbd",
        borderRadius: "0.25rem",
    };

    const btnStyle = {
        fontWeight: "700",
        color: "white",
        textDecoration: "none",
        padding: ".2em 1em calc(.2em + 3px)",
        borderRadius: "3px",
        background: "rgb(64,199,129)",
    };

    const handleClick = (event) => {
        event.preventDefault();
        const player = {name};
        console.log(player);
        fetch(
            URL + "addPlayer", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(player)
            }
        ).then(res => res.json()
            .then(result => {
                console.log(result);
                window.location.assign("menu/" + result.id);
            })
        )
    };
    return (
        <div className="Login">
            <h1 style={{color: "blue"}}>Login</h1>
            <form noValidate autoComplete="off">
                <input value={name} style={inputStyle} onChange={event => setName(event.target.value)}/>
                <br/>
                <br/>
                <button style={btnStyle} onClick={handleClick}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;