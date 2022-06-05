import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Login from "./Login";
import Game from "./Game";
import Menu from "./Menu";

const InstructorApp = () => {
    return (
        <div className="InstructorApp">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/menu/:id" component={Menu}/>
                    <Route exact path="/game/:id" component={Game}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default InstructorApp;