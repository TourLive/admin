import React, { Component } from 'react';
import './App.css';
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Import from "./components/Import";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";

class App extends Component {
  state = {}

  handleMenuItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Menu stackable>
              <Menu.Item as={ Link } to="/" name='logo' onClick={this.handleMenuItemClick}>
                <img src="logo.png" alt="TourLive Logo"/>
              </Menu.Item>
              <Menu.Item as={ Link } to="/" name='home' active={activeItem === 'home' || activeItem === 'logo'} onClick={this.handleMenuItemClick}>
                Home
              </Menu.Item>
              <Menu.Item as={ Link } to="/login" name='login' active={activeItem === 'login'} onClick={this.handleMenuItemClick}>
                Login
              </Menu.Item>
              <Menu.Item as={ Link } to="/import" name='import' active={activeItem === 'import'} onClick={this.handleMenuItemClick}>
                Import
              </Menu.Item>
              <Menu.Item as={ Link } to="/settings" name='settings' active={activeItem === 'settings'} onClick={this.handleMenuItemClick}>
                Settings
              </Menu.Item>
            </Menu>
          </header>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/import" component={Import}/>
            <Route path="/settings" component={Settings}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
