import React, {useState} from 'react';
import PositiveBtn from "./PositiveBtn";

const Login = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const URL = "http://localhost:8080/login/";

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
        ).then(res => {
                console.log(res);
                if (res.status === 200) {
                    res.json()
                        .then(result => {
                            console.log(result);
                            window.location.assign("menu/" + result.id);
                        });
                } else {
                    console.log(res);
                    res.json().then(result => setError(result));
                }
            }
        );
    };

    if (error) {
        return (
            <div className="Login">
                <p style={{color: "rgb(0,0,0,90%)", fontSize: "2rem"}}>Login</p>
                <form noValidate autoComplete="off">
                    <input value={name} style={inputStyle} placeholder={'Введите имя'}
                           onChange={event => setName(event.target.value)}/>
                    <br/>
                    <br/>
                    <h4 style={{color: "red"}}>{error.message}</h4>
                    <PositiveBtn func={handleClick} text="Login"/>
                </form>
            </div>
        );
    }

    return (
        <div className="Login">
            <p style={{color: "rgb(0,0,0,90%)", fontSize: "2rem"}}>Login</p>
            <form noValidate autoComplete="off">
                <input value={name} style={inputStyle} placeholder={'Введите имя'}
                       onChange={event => setName(event.target.value)}/>
                <br/>
                <br/>
                <PositiveBtn func={handleClick} text="Login"/>
            </form>
        </div>
    );
};

export default Login;