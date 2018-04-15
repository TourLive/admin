import React, { Component } from 'react'
import {Button, Form, Segment} from "semantic-ui-react";
import axios from 'axios/index'

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      raceID: 1000,
      stageID: 0,
      races: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({raceID: props.currentData.raceID});
    this.setState({stageID: props.currentData.stageID});
    this.setState({races: props.now});
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: parseInt(event.target.value,10)
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
    });
  }
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