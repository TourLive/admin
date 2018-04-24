import React, {Component} from "react";
import LoginForm from './LoginForm'
import {Header} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Login extends Component {
  render() {
      const {user} = this.props;
      return(
        user.loggedIn ? (
            <Redirect to={{ pathname : '/'}}/>
        ) : (
            <div className="App-Content">
                <Helmet>
                    <title>Tourlive Admin | Login</title>
                </Helmet>
                <Header as="h1" color='red'>Login</Header>
                <LoginForm/>
            </div>
        )
    );
  }
}

function mapStateToProps(store) {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(Login);

