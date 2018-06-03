import React, { Component } from 'react';
import './App.css';
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";
import {PrivateRoute} from "./components/PrivateRoute";
import {connect} from "react-redux";
import store from "./store";
import * as adminActions from "./actions/adminActions";
import ImportStaticDataContainer from "./containers/ImportStaticDataContainer";
import ImportDynamicDataContainer from "./containers/ImportDynamicDataContainer";
import DataContainer from "./containers/DataContainer";


class App extends Component {
  state = {}

  handleMenuItemClick = (e, {name}) => this.setState({activeItem: name});

    componentDidMount() {
        store.dispatch(adminActions.getLocalUsername());
    }

  render() {
    const {activeItem} = this.state;
    const {user} = this.props;

    const logo = (
        <Menu.Item as={ Link } to="/" name='logo' onClick={this.handleMenuItemClick}>
            <img src="../logo.png" alt="TourLive Logo"/>
        </Menu.Item>
    );

    const menu = user.loggedIn ? (
        [
            <Menu.Item as={ Link } key="1001" to="/" name='home' active={activeItem === 'home'} onClick={this.handleMenuItemClick}>
                Home
            </Menu.Item>,
            <Menu.Item as={ Link } key="1002" to="/settings" name='settings' active={activeItem === 'settings'} onClick={this.handleMenuItemClick}>
                Einstellungen
            </Menu.Item>,
            <Menu.Item as={ Link } key="1003" to="/data" name='data' active={activeItem === 'data'} onClick={this.handleMenuItemClick}>
                Daten in der API
            </Menu.Item>,
            <Menu.Item as={ Link } key="1004" to="/importstatic" name='importstatic' active={activeItem === 'importstatic'} onClick={this.handleMenuItemClick}>
                Import von statischen Daten
            </Menu.Item>,
            <Menu.Item as={ Link } key="1005" to="/importdynamic" name='importdynamic' active={activeItem === 'importdynamic'} onClick={this.handleMenuItemClick}>
                Import von dynamischen Daten
            </Menu.Item>,
            <Menu.Item as={ Link } key="1006" to="/logout" name='logout' active={activeItem === 'logout'} onClick={this.handleMenuItemClick}>
                Logout
            </Menu.Item>
        ]
         ) : (<Menu.Item as={ Link } key="1007" to="/login" name='login' active={activeItem === 'login'} onClick={this.handleMenuItemClick}>
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
            <PrivateRoute exact path="/importstatic" component={ImportStaticDataContainer}/>
            <PrivateRoute exact path="/importdynamic" component={ImportDynamicDataContainer}/>
            <PrivateRoute exact path="/settings" component={Settings}/>
            <PrivateRoute exact path="/data" component={DataContainer}/>
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
