import React, { Component } from 'react'
import {Button, Form, Segment, Message} from "semantic-ui-react";
import * as adminActions from "../actions/adminActions";
import store from "../store"
import {connect} from "react-redux";

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postLogin = this.postLogin.bind(this);
  }

  postLogin(user) {
      store.dispatch(adminActions.postLogin(user))
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(user);
      this.postLogin(user);
  }
  render() {
    const {user} = this.props;
    console.log(user.error);
    console.log(user.error !== "");
    return(
      <Form error={user.error !== "" || user.error === undefined} onSubmit={this.handleSubmit}>
          <Message
              error
              header='Login nicht erfolgreich'
              content='Das Passwort oder der Benutzername ist falsch.'
          />
        <Segment>
          <Form.Field>
            <label>Username</label>
            <input name="username" placeholder='z.B. admin' onChange={this.handleInputChange} type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" placeholder='z.B. Pa$$w0rd' type="password" onChange={this.handleInputChange}/>
          </Form.Field>
          <Button primary fluid>Login</Button>
        </Segment>
      </Form>
    );
  }
}

function mapStateToProps(store) {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(LoginForm);