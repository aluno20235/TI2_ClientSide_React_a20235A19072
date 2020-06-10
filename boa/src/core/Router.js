import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarComponent from "../components/global/Navbar";
import PrivateRoute from "../components/global/PrivateRoute";
import roles from "../configs/roles";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import AlbumListPage from "../pages/album/List";
import AlbumDetailsPage from "../pages/album/Details";
import ArtistListPage from "../pages/artist/List";
import ArtistDetailsPage from "../pages/artist/Details";
import GenreListPage from "../pages/genre/List";
import GenreDetailsPage from "../pages/genre/Details";
import UserListPage from "../pages/user/List";
import UserDetailsPage from "../pages/user/Details";

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/album/list" component={AlbumListPage} />
          <PrivateRoute exact path="/album/details/:id" component={AlbumDetailsPage} />
          <PrivateRoute exact path="/artist/list" component={ArtistListPage} />
          <PrivateRoute exact path="/artist/details/:id" component={ArtistDetailsPage} />
          <PrivateRoute exact path="/genre/list" component={GenreListPage} />
          <PrivateRoute exact path="/genre/details/:id" component={GenreDetailsPage} />
          <PrivateRoute roles={[roles.Admin]} exact path="/user/list" component={UserListPage} />
          <PrivateRoute roles={[roles.Admin]} exact path="/user/details/:id" component={UserDetailsPage} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}