import React, { Component } from 'react'
import {Button, Form, Message} from "semantic-ui-react";
import axios from "axios";

class SettingsForm extends Component {
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

    const setting = {
      raceID: this.state.raceID,
      stageID: this.state.stageID
    }

    axios.put("http://localhost:9000/settings", {setting}).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  render() {
    return(
      <Form success onSubmit={this.handleSubmit}>
          <Form.Field onChange={this.handleInputChange} control='select' name="raceID" value={this.state.raceID}>
            {this.state.races.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
          </Form.Field>
          <Form.Field onChange={this.handleInputChange} control='select' name="stageID">
            {this.state.races.filter(item => item.id === this.state.raceID).map(item => {
              return (item.stages.map(sub => {
                return (<option key={sub.id} value={sub.id}>{sub.stageName} ({sub.start} nach {sub.destination}, {sub.stageType})</option>)
              }))
            })}
          </Form.Field>
          <Message
            success
            header='Form Completed'
            content="You're all signed up for the newsletter"
          />
          <Message
            error
            header='Action Forbidden'
            content='You can only sign up for an account once with a given e-mail address.'
          />
          <Button primary fluid>Einstellungen speichern</Button>
      </Form>
    );
  }
}

export default SettingsForm;