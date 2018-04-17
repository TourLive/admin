import React, {Component} from "react";
import LoginForm from './LoginForm'
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";

class Login extends Component {
  render() {
    return(
        <div className="App-Content">
          <Helmet>
            <title>Tourlive Admin | Login</title>
          </Helmet>
          <Header as="h1" color='red'>Login</Header>
          <LoginForm/>
        </div>
    );
  }
}

export default Login;