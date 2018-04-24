import React, { Component } from 'react';
import './App.css';
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Import from "./components/Import";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";
import {PrivateRoute} from "./components/PrivateRoute";
import {connect} from "react-redux";

class App extends Component {
  state = {}

  handleMenuItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state;
    const {user} = this.props;

    const logo = (
        <Menu.Item as={ Link } to="/" name='logo' onClick={this.handleMenuItemClick}>
            <img src="logo.png" alt="TourLive Logo"/>
        </Menu.Item>
    );

    const menu = user.loggedIn ? (
        [
            <Menu.Item as={ Link } key="1001" to="/" name='home' active={activeItem === 'home'} onClick={this.handleMenuItemClick}>
                Home
            </Menu.Item>,
            <Menu.Item as={ Link } key="1002" to="/settings" name='settings' active={activeItem === 'settings'} onClick={this.handleMenuItemClick}>
                Settings
            </Menu.Item>,
            <Menu.Item as={ Link } key="1003" to="/import" name='import' active={activeItem === 'import'} onClick={this.handleMenuItemClick}>
                Import
            </Menu.Item>,
            <Menu.Item as={ Link } key="1004" to="/logout" name='logout' active={activeItem === 'logout'} onClick={this.handleMenuItemClick}>
                Logout
            </Menu.Item>
        ]
         ) : (<Menu.Item as={ Link } key="1005" to="/login" name='login' active={activeItem === 'login'} onClick={this.handleMenuItemClick}>
            Login
        </Menu.Item>
    );

      const mainNav = (
          <Menu stackable>
              {logo}
              {menu}
          </Menu>
      );

    return (
      <Router>
        <div className="App">
          <header className="App-header">
              {mainNav}
          </header>
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute exact path="/import" component={Import}/>
            <PrivateRoute exact path="/settings" component={Settings}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(store) {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(App);
