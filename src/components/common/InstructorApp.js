import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Game from '../game/Game';
import Menu from './Menu.js';
import Statistic from '../player/Statistic.js';
import SignUp from '../auth/SignUp.js';
import Main from './Main.js';
import Tutor from '../game/Tutor.js';
import Profile from '../player/Profile.js';
import AllUsers from '../admin/AllUsers.js';
import UserAdmin from '../admin/UserAdmin.js';
import AllGames from '../game/AllGames.js';

const InstructorApp = () => {
  return (
    <div className="InstructorApp">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/tutor" component={Tutor} />
          <Route exact path="/game/:id" component={Game} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/statistic" component={Statistic} />
          <Route exact path="/admin/allUsers" component={AllUsers} />
          <Route exact path="/admin/user/:id" component={UserAdmin} />
          <Route exact path="/games" component={AllGames} />
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default InstructorApp;
