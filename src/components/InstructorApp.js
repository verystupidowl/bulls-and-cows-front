import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Login from "./Login";
import Game from "./Game";
import Menu from "./Menu";
import Statistic from "./Statistic";

const InstructorApp = () => {
    return (
        <div className="InstructorApp">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/menu/:id" component={Menu}/>
                    <Route exact path="/game/:id" component={Game}/>
                    <Route exact path="/statistic/:id" component={Statistic}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default InstructorApp;