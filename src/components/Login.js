import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import LoginForm from './LoginForm'
import {Header} from "semantic-ui-react";

class Login extends Component {
  render() {
    return(
      <DocumentTitle title="Login Component">
        <div className="Login">
          <Header as="h1">Login</Header>
          <LoginForm/>
        </div>
      </DocumentTitle>
    );
  }
}

export default Login;