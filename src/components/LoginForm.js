import React, { Component } from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import axios from 'axios/index'

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    axios.post("http://localhost:9000/login", {user}).then(res => {
        console.log(res);
        console.log(res.data);
      if (res.status === 200) {
        console.log("login sucessfully");
      } else {
        console.log("Username or password does not exist");
      }
    }).catch(function (error) {
        console.log(error);
    });
  }
  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Segment>
          <Form.Field>
            <label>Username</label>
            <input name="username" placeholder='firstname.lastname@domain.ch' onChange={this.handleInputChange} type="text"/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" type="password" onChange={this.handleInputChange}/>
          </Form.Field>
          <Button primary fluid>Login</Button>
        </Segment>
      </Form>
    );
  }
}

export default LoginForm;