import React, { Component } from 'react'
import {Button, Form, Segment} from "semantic-ui-react";

class LoginForm extends Component {
  render() {
    return(
      <Form>
        <Segment>
          <Form.Field>
            <label>Username</label>
            <input placeholder='firstname.lastname@domain.ch' type="email"/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password"/>
          </Form.Field>
          <Button primary fluid>Login</Button>
        </Segment>
      </Form>
    );
  }
}

export default LoginForm;